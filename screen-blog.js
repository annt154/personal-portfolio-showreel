(() => {
  'use strict';
  const overlay = document.getElementById('overlay');
  const categoryHeading = cat => {
    const key={animation:'motion',film:'production',graphic:'graphic',art:'art',ui:'ui',sound:'sound'}[cat];
    return window.illustratedTitle ? window.illustratedTitle(key,CAT_LABEL[cat]||cat) : CAT_LABEL[cat]||cat;
  };
  // The legacy catalog moves this button outside .overlay-inner.
  const globalBack=overlay.querySelector('.overlay-close');
  if(globalBack){
    const arrow=document.createElement('img');arrow.src='assets/hello/spiral-back.svg';arrow.alt='';
    globalBack.replaceChildren(arrow);globalBack.classList.add('drawn-return');
  }
  const indexRenderer = window.renderIndex;
  window.renderIndex = function(cat) {
    overlay.querySelectorAll('.overlay-inner > .album-categories').forEach(nav=>nav.remove());
    indexRenderer(cat);
    const inner = overlay.querySelector('.overlay-inner');
    inner.classList.add('screen-library');
    const title = document.getElementById('ov-cat');
    title.replaceChildren();
    const label = CAT_LABEL[cat === 'art' ? 'graphic' : cat] || cat;
    const lettering = document.createElement('span'); lettering.className = 'forest-lettering';
    lettering.setAttribute('aria-label', label);
    [...label].forEach((character,i) => {
      const span = document.createElement('span'); span.textContent = character === ' ' ? '\u00a0' : character;
      span.setAttribute('aria-hidden','true'); span.style.setProperty('--tilt', [-5,3,-2,4,0][i%5]+'deg');
      lettering.append(span);
    });
    title.innerHTML=categoryHeading(cat);
    const stage = inner.querySelector('.collection-stage');
    const categories = inner.querySelector('.album-categories');
    const stamps = inner.querySelector('.collection-stamps');
    // Category links sit above the two content panels, not in a third column.
    if(stage && categories) {
      categories.querySelectorAll('h2,h3').forEach(heading=>heading.remove());
      inner.prepend(categories);
    }
    const layout=inner.querySelector('.album-layout');
    const key=cat==='art'?'graphic':cat;
    const entries=(DATA[key]||[]).map((item,index)=>({item,open:()=>selectIndexItem(key,index)}));
    if(key==='graphic') ART_IMAGES.forEach(([file,title,medium,year],index)=>entries.push({item:{title,subtitle:medium,year,cover:'assets/works/'+file},open:()=>openArtImage(index)}));
    layout.classList.add('film-library');layout.replaceChildren();
    if(!entries.length){const empty=document.createElement('p');empty.className='film-empty';empty.textContent='New studies coming soon.';layout.append(empty);return;}
    const reel=document.createElement('div');reel.className='film-reel';reel.setAttribute('aria-label','Choose a project');
    const caption=document.createElement('div');caption.className='film-caption';caption.setAttribute('aria-live','polite');
    const filmTitle=document.createElement('h2'),subtitle=document.createElement('p'),open=document.createElement('button');open.type='button';open.textContent='View project';caption.append(filmTitle,subtitle,open);
    const navigation=document.createElement('nav');navigation.className='film-navigation';navigation.setAttribute('aria-label','Browse projects');
    const previous=document.createElement('button'),next=document.createElement('button'),count=document.createElement('span');
    previous.type=next.type='button';previous.textContent='Previous';next.textContent='Next';navigation.append(previous,count,next);
    let selected=Math.min(bookPositions[key]||0,entries.length-1);
    const cards=entries.map(({item},index)=>{
      const button=document.createElement('button');button.type='button';button.className='film-poster';button.setAttribute('aria-label',item.title);
      const image=document.createElement('img');image.alt=item.title;image.loading='lazy';catalogImage(image,item);button.append(image);
      button.onclick=()=>index===selected?entries[index].open():select(index);reel.append(button);return button;
    });
    function select(index){
      selected=(index+entries.length)%entries.length;bookPositions[key]=selected;
      cards.forEach((card,i)=>{
        let offset=i-selected;
        if(offset>entries.length/2)offset-=entries.length;if(offset< -entries.length/2)offset+=entries.length;
        card.style.setProperty('--offset',offset);card.style.setProperty('--distance',Math.abs(offset));
        card.style.zIndex=String(10-Math.abs(offset));card.dataset.active=String(i===selected);
        card.hidden=Math.abs(offset)>1;card.setAttribute('aria-pressed',String(i===selected));
      });
      filmTitle.textContent=entries[selected].item.title;subtitle.textContent=entries[selected].item.subtitle||'';
      count.textContent=String(selected+1).padStart(2,'0')+' / '+String(entries.length).padStart(2,'0');
      open.onclick=entries[selected].open;previous.disabled=next.disabled=entries.length<2;
    }
    previous.onclick=()=>select(selected-1);next.onclick=()=>select(selected+1);
    reel.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();select(selected+(event.key==='ArrowLeft'?-1:1));cards[selected].focus({preventScroll:true});}});
    layout.append(reel,navigation,caption);select(selected);
  };
  const dossierRenderer = window.renderDossier;
  window.renderDossier = function(item, cat) {
    overlay.querySelectorAll('.overlay-inner > .album-categories').forEach(nav=>nav.remove());
    overlay.dataset.category = cat;
    const template = document.createElement('template'); template.innerHTML = dossierRenderer(item, cat);
    const paper = template.content.querySelector('.article-paper');
    if(!paper) return template.innerHTML;
    paper.classList.add('screen-paper');
    const reading = document.createElement('div'); reading.className = 'screen-reading';
    reading.append(...paper.childNodes); paper.append(reading);
    // Publication edits apply across every existing project renderer.
    reading.querySelectorAll('h2,h3').forEach(heading=>{
      if(/reflection/i.test(heading.textContent)||/^tarot symbolism$/i.test(heading.textContent.trim()))
        heading.closest('section,footer,.dossier-entry')?.remove();
    });
    reading.querySelectorAll('h2').forEach(heading=>{
      if(!/^credits$/i.test(heading.textContent.trim()))return;
      const section=heading.closest('section,footer,.dossier-entry');
      section?.classList.add('entry-credits');
      section?.querySelectorAll('p').forEach(paragraph=>{
        const holder=document.createElement('div');holder.innerHTML=paragraph.innerHTML.replace(/<br\s*\/?\s*>/gi,'\n');
        const lines=holder.textContent.replace(/\.\s+(?=[A-Z\[])/g,'.\n').split(/\n+/).map(line=>line.trim()).filter(Boolean);
        if(lines.length<2)return;
        lines.forEach(line=>{const p=document.createElement('p');p.textContent=line;paragraph.before(p);});paragraph.remove();
      });
    });
    reading.querySelectorAll('dt').forEach(label=>{
      if(!/role|contribution/i.test(label.textContent))return;
      const value=label.nextElementSibling;
      if(value?.tagName==='DD')value.textContent=value.textContent.replace(/,\s*|\s+and\s+/g,'\n');
    });
    const sunOutcome=reading.querySelector('.sun-outcome');
    if(sunOutcome){
      const figures=[...sunOutcome.querySelectorAll('figure')];
      const strip=document.createElement('div');strip.className='sun-final-strip';strip.append(...figures);
      sunOutcome.querySelector('.sun-two-col')?.remove();sunOutcome.append(strip);
    }
    const media = reading.querySelector('.forest-viewer,.study-video,.case-video,.sun-hero,.sun-video,.sun-hero-media,.study-figure,.case-figure,.selection-frame,.experience-preview');
    const shell = document.createElement('section'); shell.className = 'screen-hero'; shell.setAttribute('aria-label',item.title+' — featured work');
    const screen = document.createElement('div'); screen.className = 'screen-player';
    const controls = document.createElement('nav'); controls.className = 'screen-bar'; controls.setAttribute('aria-label','Project controls');
    const back = document.createElement('button'); back.type='button'; back.className='screen-back'; back.setAttribute('aria-label','Back to all work'); back.title='All work';back.setAttribute('onclick',`openOverlay('${cat}')`);
    const arrow=document.createElement('img'); arrow.src='assets/hello/spiral-back.svg'; arrow.alt=''; back.append(arrow);
    const title = document.createElement('span'); title.className='screen-project-name';title.textContent=item.title;
    const down = document.createElement('button'); down.type='button';down.textContent='Read entry ↓';down.dataset.screenRead='';
    controls.append(back,title,down);
    const frame = document.createElement('div'); frame.className='screen-media';
    if(media) frame.append(media);
    else {const image=document.createElement('img'); image.src=item.thumbnail||item.cover;image.alt=item.title;frame.append(image);}
    // The film fills the opening viewport; the navigation follows it in document flow.
    screen.append(frame); shell.append(screen);
    paper.prepend(shell);
    const blog=document.createElement('div');blog.className='entry-columns';
    reading.before(blog);blog.append(reading);
    const sidebar=document.createElement('aside');sidebar.className='entry-sidebar';sidebar.setAttribute('aria-label','Entry information and contents');
    const category=document.createElement('div');category.className='entry-category';
    const categoryArt=document.createElement('span');categoryArt.className='entry-category-art';categoryArt.innerHTML=categoryHeading(cat);category.append(categoryArt);
    const returnLink=back.cloneNode(true);category.prepend(returnLink);shell.after(category);
    const contents=document.createElement('nav');contents.className='entry-contents';contents.setAttribute('aria-label','On this page');
    const contentsTitle=document.createElement('h2');contentsTitle.textContent='In this entry';contents.append(contentsTitle);
    reading.querySelectorAll('h2').forEach((heading,index)=>{heading.id='entry-section-'+index;const link=document.createElement('a');link.href='#'+heading.id;link.textContent=heading.textContent;contents.append(link);});
    reading.querySelectorAll('.study-section,.case-section,.sun-section,.forest-section,.dossier-entry').forEach(section=>{
      const heading=[...section.children].find(node=>node.matches('h2,header,.dossier-entry-head'));
      if(!heading)return;
      section.classList.add('entry-section');
    });
    const info=reading.querySelector('.study-info,.case-information,.sun-info,.forest-info');
    if(info){
      const facts=document.createElement('section');facts.className='entry-facts';
      const label=document.createElement('h2');label.textContent='Project notes';facts.append(label,info);sidebar.append(facts);
    }
    sidebar.append(contents);blog.prepend(sidebar);
    return template.innerHTML;
  };
  let exitFrame=false;
  function updateHeroDepth(){
    exitFrame=false;
    const hero=overlay.querySelector('.screen-hero');if(!hero)return;
    const progress=matchMedia('(prefers-reduced-motion: reduce)').matches?0:Math.min(1,Math.max(0,overlay.scrollTop/(hero.clientHeight||innerHeight)));
    hero.style.setProperty('--hero-exit',progress.toFixed(4));
  }
  function queueHeroDepth(){if(!exitFrame){exitFrame=true;requestAnimationFrame(updateHeroDepth);}}
  overlay.addEventListener('scroll',queueHeroDepth,{passive:true});
  new MutationObserver(queueHeroDepth).observe(document.getElementById('ov-body'),{childList:true});
  overlay.addEventListener('click',event=>{
    const anchor=event.target.closest('.entry-contents a');
    if(anchor){event.preventDefault();const section=overlay.querySelector(anchor.getAttribute('href'));section?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
    if(event.target.closest('[data-screen-read]')) {
      const reading=overlay.querySelector('.screen-reading');
      const bar=overlay.querySelector('.entry-category');
      if(reading) overlay.scrollTo({top:overlay.scrollTop+reading.getBoundingClientRect().top-overlay.getBoundingClientRect().top-(bar?.offsetHeight||70)-16,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    }
  });
})();

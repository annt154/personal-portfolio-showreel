(() => {
  CAT_LABEL.graphic = 'Graphic & art';
  CAT_LABEL.sound = 'Sound';
  DATA.sound = DATA.sound || [];
  const graphicFish = document.getElementById('k3');
  graphicFish.querySelector('.flabel').textContent = 'Graphic & art';
  graphicFish.setAttribute('aria-label', 'Open Graphic & art album');
  const soundFish = document.getElementById('k5');
  soundFish.dataset.cat = 'sound';
  soundFish.querySelector('.flabel').textContent = 'Sound';
  soundFish.setAttribute('aria-label', 'Open Sound album');
  const titleRenderer = window.illustratedTitle;
  window.illustratedTitle = (id, label) => id === 'graphic' ? '<span class="illustrated-title combined-category-title">Graphic &amp; art</span>' : titleRenderer(id, label);
  const education = document.querySelector('.cloud-facts > section:first-child p');
  education.innerHTML = 'Bachelor of Design<br><span class="education-location">(Digital Media)</span><br><span class="education-years">2023&ndash;present</span>';
  const reaper = document.querySelector('.software-icons .procreate');
  reaper.className = 'app-icon reaper'; reaper.title = 'REAPER'; reaper.setAttribute('aria-label', 'REAPER');
  reaper.innerHTML = '<img src="assets/works/reaper-logo.png" alt="">';

  const categories = ['animation','film','graphic','ui','sound'];
  if (!DATA.animation.some(p=>p.id==='odyssey')) DATA.animation.push({id:'odyssey',title:'The Odyssey',subtitle:'Motion Design',year:'',age:'',video:'',cover:'assets/works/TheOdyssey.jpeg',gallery:[],tags:[],sections:[]});
  const previewPositions = {};
  window.renderIndex = function(cat) {
    if (cat === 'art') cat = 'graphic';
    const overlay = document.getElementById('overlay');
    overlay.dataset.category = cat;
    overlay.querySelector('.overlay-inner').className = 'overlay-inner album-mode';
    const body = document.getElementById('ov-body');
    body.replaceChildren();
    const layout = document.createElement('div'); layout.className = 'album-layout';
    const nav = document.createElement('nav'); nav.className = 'category-panel album-categories'; nav.setAttribute('aria-label','Portfolio categories');
    nav.innerHTML = '<h2>Categories</h2>';
    categories.forEach(key => {
      const button = document.createElement('button'); button.type = 'button'; button.textContent = CAT_LABEL[key];
      button.setAttribute('aria-current',key === cat ? 'page':'false'); button.onclick = () => openOverlay(key); nav.append(button);
    });
    const grid = document.createElement('section'); grid.className = 'project-album'; grid.setAttribute('aria-label',CAT_LABEL[cat] + ' album');
    const cards = (DATA[cat] || []).map((item,index) => ({item,open:()=>selectIndexItem(cat,index)}));
    if (cat === 'graphic') ART_IMAGES.forEach(([file,title,medium,year],index) => cards.push({item:{title,year,cover:'assets/works/'+file,art:true},open:()=>openArtImage(index)}));
    const entries = document.createElement('nav'); entries.className = 'category-panel album-entries'; entries.setAttribute('aria-label','Album entries');
    entries.innerHTML = '<h2>Entries</h2>';
    const stage=document.createElement('div');stage.className='collection-stage';
    const hero=document.createElement('button');hero.type='button';hero.className='collection-preview';hero.innerHTML='<span class="crt-display"><img alt=""></span><span class="collection-caption"><small></small><strong></strong><span>Open project ↗</span></span>';
    const controls=document.createElement('div');controls.className='collection-controls';controls.innerHTML='<button type="button" aria-label="Previous project">← Previous</button><span aria-live="polite"></span><button type="button" aria-label="Next project">Next →</button>';
    let selected=Math.min(previewPositions[cat]||0,cards.length-1);
    function select(index){
      if(!cards.length)return;
      selected=(index+cards.length)%cards.length;previewPositions[cat]=selected;
      const {item,open}=cards[selected];catalogImage(hero.querySelector('img'),item);hero.querySelector('img').alt=item.title;
      if(!matchMedia('(prefers-reduced-motion: reduce)').matches){hero.getAnimations().forEach(animation=>animation.cancel());hero.animate([{opacity:.65},{opacity:1}],{duration:240,easing:'ease-out'});}
      controls.querySelector('span').textContent='';controls.firstElementChild.textContent='Previous';controls.lastElementChild.textContent='Next';
      hero.querySelector('.collection-caption>span').textContent=item.subtitle||'Open project';hero.querySelector('strong').textContent=item.title;hero.querySelector('small').textContent=/^\d/.test(item.year||'')?item.year:'';hero.onclick=open;
      [...grid.children].forEach((el,i)=>el.setAttribute('aria-pressed',String(i===selected)));
      [...entries.querySelectorAll('button')].forEach((el,i)=>el.setAttribute('aria-current',i===selected?'true':'false'));
      const thumb=grid.children[selected];
      if(thumb){const r=thumb.getBoundingClientRect(),s=stamps.getBoundingClientRect();const delta=r.top<s.top+45?r.top-s.top-45:r.bottom>s.bottom?r.bottom-s.bottom:0;if(delta)stamps.scrollBy({top:delta,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
    }
    controls.firstElementChild.onclick=()=>select(selected-1);controls.lastElementChild.onclick=()=>select(selected+1);
    cards.forEach(({item,open}, index) => {
      const entry = document.createElement('button'); entry.type = 'button'; entry.textContent = String(index + 1).padStart(2,'0') + ' ' + item.title; entry.onclick = ()=>select(index); entries.append(entry);
      const card = document.createElement('button'); card.type = 'button'; card.className = 'album-card';
      const frame = document.createElement('span'); frame.className = 'album-photo';
      const img = document.createElement('img'); img.alt = item.title; img.loading = 'lazy';
      catalogImage(img,item); frame.append(img);
      const title = document.createElement('span'); title.className='album-caption'; title.textContent=item.title;
      const year = document.createElement('span'); year.className='album-year'; year.textContent=/^\d/.test(item.year||'') ? item.year : '';
      card.append(frame,title,year);card.onclick=()=>select(index);grid.append(card);
    });
    if (!cards.length) { const note=document.createElement('p');note.className='album-empty';note.textContent='Sound studies coming soon.';grid.append(note); }
    const stamps=document.createElement('aside');stamps.className='collection-stamps';stamps.innerHTML='<h2>Stamps</h2>';
    if(cards.length){stage.append(hero,controls);stamps.append(grid);}else stage.append(grid);
    layout.append(nav,stage);if(cards.length)layout.append(stamps);body.append(layout);
    // All thumbnails remain available in the independently scrolling right panel.
    // Let each category and thumbnail frame use its own natural height.
    select(selected);
  };
  window.renderArtGallery = () => { document.getElementById('ov-cat').textContent='Graphic & art'; renderIndex('graphic'); };

  // Keep project metadata on opposite corners immediately below the media frame.
  const mediaRenderer = window.renderProjectMedia;
  window.renderProjectMedia = (item,cat) => mediaRenderer(item,cat) + `<div class="frame-metadata"><span>${/^\d/.test(item.year||'') ? item.year : ''}</span><span>${projectMedium(item)}</span></div>`;
})();

// Match text brightness to the left skin strip and the Under-Forest reading light.
(() => {
 const overlay=document.getElementById('overlay');
 let pending=false;
 function update(){
  pending=false;
  if(overlay.querySelector('.screen-paper'))return;
  overlay.querySelectorAll('.study-copy,.study-section>h2,.case-copy,.dossier-entry-body p,.sun-section p,.case-section>h2,.sun-section>h2,.dossier-entry-head,.case-under p,.dossier-subtitle,.blog-footer p,.album-empty,figcaption').forEach(el=>{
   if(el.closest('.underforest,.sun-tarot,.case-dark,.case-information,.sun-info,.collection-preview'))return;
   const r=el.getBoundingClientRect();
   el.classList.add('skin-aware-ink');
   el.style.setProperty('background',`linear-gradient(to right,#ffffff ${innerWidth*.05-r.left}px,#211d18 ${innerWidth*(innerWidth<=750?.22:.28)-r.left}px)`,'important');
   el.style.setProperty('background-clip','text','important');
   el.style.setProperty('-webkit-background-clip','text','important');
   el.style.setProperty('color','#211d18','important');
   el.style.setProperty('-webkit-text-fill-color','transparent','important');
  });

  const forest=overlay.querySelector('.underforest-paper');
  if(forest){
   const top=forest.getBoundingClientRect().top;
   forest.style.setProperty('background',`linear-gradient(to bottom,var(--blog-base,#e7d2b5) ${innerHeight*.42-top}px,#263b30 ${innerHeight*.76-top}px,#0b1210 ${innerHeight-top}px)`,'important');
   forest.querySelectorAll('.underforest h1,.underforest h2,.underforest h3,.underforest p,.underforest dt,.underforest dd,.underforest figcaption,.forest-section>header>span,.forest-steps span,.study-pagination button').forEach(el=>{
    if(el.closest('.forest-viewer,.forest-pending,.forest-sound-map'))return;
    const rect=el.getBoundingClientRect();
    el.classList.add('skin-aware-ink');
    el.style.setProperty('background',`linear-gradient(to bottom,#211d18 ${innerHeight*.42-rect.top}px,#e7ead8 ${innerHeight*.70-rect.top}px)`,'important');
    el.style.setProperty('background-clip','text','important');
    el.style.setProperty('-webkit-background-clip','text','important');
    el.style.setProperty('color','#211d18','important');
    el.style.setProperty('-webkit-text-fill-color','transparent','important');
   });
  }
 }
 function queue(){if(!pending){pending=true;requestAnimationFrame(update)}}
 overlay.addEventListener('scroll',queue,{passive:true,capture:true});
 addEventListener('resize',queue,{passive:true});
 new MutationObserver(queue).observe(document.getElementById('ov-body'),{childList:true,subtree:true});
 queue();
})();

(() => {
 const body=document.getElementById('ov-body');
 function frameImages(){
  body.querySelectorAll('.article-paper img').forEach(img=>{
   if(img.closest('.underforest')||img.closest('.portfolio-study')||img.closest('.selection-frame')||img.closest('.illustrated-title')||img.classList.contains('rmit-logo'))return;
   const frame=document.createElement('span');frame.className='selection-frame';
   img.before(frame);frame.append(img);
   [[0,0],[50,0],[100,0],[0,50],[100,50],[0,100],[50,100],[100,100]].forEach(([x,y])=>{
    const handle=document.createElement('i');handle.className='selection-handle';handle.setAttribute('aria-hidden','true');handle.style.left=x+'%';handle.style.top=y+'%';frame.append(handle);
   });
  });
 }
 new MutationObserver(frameImages).observe(body,{childList:true,subtree:true});frameImages();
})();

(() => {
 const render=window.renderProjectMedia;
 window.renderProjectMedia=(item,cat)=>item.id==='odyssey'?'<figure class="case-figure"><img src="assets/works/TheOdyssey.jpeg" alt="The Odyssey projection installation"></figure>':render(item,cat);
})();

// Calm typographic artwork while a preview is unavailable.
window.catalogImage = function(image,item){
 const request=Symbol();image.previewRequest=request;
 const escape=s=>String(s).replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
 const title=escape(item.title||'Project');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><defs><linearGradient id="b" x2="1" y2="1"><stop stop-color="#223c40"/><stop offset="1" stop-color="#839b91"/></linearGradient></defs><rect width="1200" height="675" fill="url(#b)"/><g fill="none" stroke="#cdd8c4" opacity=".22"><ellipse cx="920" cy="300" rx="360" ry="210"/><ellipse cx="920" cy="320" rx="320" ry="170"/><ellipse cx="920" cy="340" rx="280" ry="130"/></g><text x="80" y="110" fill="#dce5d9" font-family="Arial,sans-serif" font-size="18" letter-spacing="5">SELECTED WORK</text><foreignObject x="80" y="315" width="1020" height="230"><div xmlns="http://www.w3.org/1999/xhtml" style="font:48px/1.15 Georgia,serif;color:#f9f7ed">${title}</div></foreignObject><text x="80" y="600" fill="#dce5d9" font-family="Arial,sans-serif" font-size="20">Preview forthcoming · Explore the project</text></svg>`;
 const fallback='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
 image.src=fallback;
 const src=catalogCover(item);if(!src)return;
 const candidates=[src];
 if(src.includes('/maxresdefault.jpg')) candidates.push(src.replace('/maxresdefault.jpg','/hqdefault.jpg'));
 if(item.cover&&!candidates.includes(item.cover)) candidates.push(item.cover);
 const loadNext=()=>{
  const candidate=candidates.shift();if(!candidate||image.previewRequest!==request)return;
  const loader=new Image();
  loader.onload=()=>{
   if(candidate.includes('/maxresdefault.jpg')&&loader.naturalWidth<480){loadNext();return;}
   if(image.previewRequest===request)image.src=candidate;
  };
  loader.onerror=loadNext;loader.src=candidate;
 };loadNext();
};

(() => {
  'use strict';
  const copy = window.PORTFOLIO_CONTENT;
  const assets = new Set(window.PORTFOLIO_ASSETS || []);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text = value => `<p class="study-copy">${esc(value)}</p>`;
  const section = (title, body, id='') => `<section class="study-section"${id?` id="${id}"`:''}><h2>${esc(title)}</h2>${body}</section>`;
  const note = value => `<p class="study-note">${esc(value)}</p>`;
  const external = (url, label, cls='') => `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span></a>`;
  const image = (src, alt, caption=alt, eager=false) => src && assets.has(src)
    ? `<figure class="study-figure"><img src="${esc(src)}" alt="${esc(alt)}" loading="${eager?'eager':'lazy'}" decoding="async"><figcaption>${esc(caption)}</figcaption></figure>` : '';
  function video(src, title, poster='') {
    if (!src) return '';
    const embed=projectVideoEmbed(src);
    if (embed) {
      const url=new URL(embed);url.searchParams.set('controls','1');url.searchParams.set('rel','0');
      const playUrl=new URL(url);playUrl.searchParams.set('autoplay','1');
      const posterDoc=poster&&assets.has(poster)?'<!doctype html><html><head><style>html,body,a{margin:0;width:100%;height:100%;display:grid;place-items:center;background:#111;color:white}img{position:absolute;width:100%;height:100%;object-fit:contain}span{z-index:1;padding:14px 20px;border:1px solid white;border-radius:50%;background:#0009;font:26px Arial}</style></head><body><a href="'+esc(playUrl.href)+'" aria-label="Play '+esc(title)+'"><img src="'+esc(poster)+'" alt="'+esc(title)+'"><span aria-hidden="true">▶</span></a></body></html>':'';
      return `<div class="study-video"><iframe ${posterDoc?'srcdoc="'+esc(posterDoc)+'" ':''}src="${esc(url.href)}" title="${esc(title)}" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div><p class="study-video-link">${external(src,'Watch video directly')}</p>`;
    }
    return assets.has(src) ? `<figure class="study-figure"><video src="${esc(src)}"${assets.has(poster)?` poster="${esc(poster)}"`:''} controls playsinline preload="none" aria-label="${esc(title)}">Your browser cannot play this video. <a href="${esc(src)}">Open video file</a></video><figcaption>${esc(title)} · <a href="${esc(src)}">Open video file</a></figcaption></figure>` : note('Video to be supplied.');
  }
  const info = p => `<dl class="study-info">${[['Project type',p.subtitle],['Year',p.year||'To be confirmed'],['My role',p.role||'To be confirmed'],['Tools',p.tools||'To be confirmed']].map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;
  const heading = p => `<header class="study-heading"><h1 tabindex="-1">${esc(p.title)}</h1><p>${esc(p.subtitle||'')}</p></header>`;
  const finish = p => (p.reflection?section('Reflection',text(p.reflection)):'') + section('Credits',text(p.credits||'Project credits to be confirmed.'));
  function preview(channel, size='') {
    if (!channel.preview) return `<div class="channel-window channel-pending"><div class="channel-chrome">Channel 03</div><div class="channel-awaiting"><span>COMING SOON</span><p>A new interaction is taking shape.</p></div></div>`;
    // A frozen copy of the actual source, with all scripts and audio removed.
    // Sandbox intentionally has no permissions; no autoplay or third-party code executes.
    return `<figure class="experience-preview ${size}"><div class="channel-window"><div class="channel-chrome"><span aria-hidden="true">◦ ◦ ◦</span><span>${esc(channel.url.replace('https://',''))}</span></div><div class="preview-viewport"><iframe src="${esc(channel.preview)}" title="${esc(channel.title)} — static source preview" sandbox="" allow="autoplay 'none'" loading="lazy" tabindex="-1" inert></iframe></div></div><figcaption>Static preview of the current live interface · open the experience to interact.</figcaption></figure>`;
  }
  function roseStudy() {
    const p=copy.rose,c=p;
    const first=preview(c,'preview-large')+heading(p)+external(c.url,'Open website','experience-link');
    return first+info(p)+note('Version note: the preview shows the current public build. The artist-story panel and responsive three-column layout below describe my documented design direction, not this live build.')+section('Overview',text(p.overview))+section('Design context',text(p.sections[0][1]))+
      section('Layout and visual development',text(p.sections[1][1])+`<div class="layout-study" aria-label="Documented three-column design direction"><span>Playlist</span><span>Active playback</span><span>Artist information</span></div>`+note('Design direction diagram — not a screenshot of the current live version.'))+
      section('Interaction and UI',text(p.sections[2][1])+`<div class="interaction-line"><span>Choose a track</span><span aria-hidden="true">→</span><span>Play / pause</span><span aria-hidden="true">→</span><span>Disc responds</span></div>`)+
      section('Technical development',text(p.sections[3][1])+`<pre class="study-code" aria-label="Excerpt from the live playback control"><code>playButton.addEventListener("click", () =&gt; {
  if (playButton.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }
  playButton.classList.toggle("pause");
  disk.classList.toggle("play");
});</code></pre>`)+
      section('Current build and next assets',text(p.sections[4][1])+note('Awaiting: revised full interface, three-column detail, vinyl control capture and responsive mobile screenshot.'))+
      external(c.url,'Open Experience','experience-link')+finish(p);
  }
  function dressStudy() {
    const p=copy.dress,c=p;
    return preview(c,'preview-large')+heading(p)+external(c.url,'Open website','experience-link')+info(p)+section('Overview',text(p.overview))+
      p.sections.map(([h,s],i)=>section(h,text(s)+(i===0?`<div class="interaction-line"><span>Wardrobe item</span><span aria-hidden="true">→ drag</span><span>Character canvas</span><span aria-hidden="true">→</span><span>Remove / undo / reset</span></div>`:''))).join('')+
      note('Awaiting: interaction-in-progress capture, changed outfit state, original planning document and final browser screenshot. The diagram above explains the verified code; it is not an original planning artifact.')+
      external(c.url,'Open Experience','experience-link')+section('Reflection',note('Personal reflection to be supplied.'))+section('Credits',text(p.credits));
  }
  function uncanny() {
    const p=copy.ud,media=window.CASE_MEDIA.ud;
    let html=video(p.works[0].video,'Endless Lullaby — complete animation',p.works[0].thumbnail)+note('Featured work: Endless Lullaby, 2025.')+heading(p)+info(p)+section('Investigation',text(p.overview));
    p.works.forEach((w,i)=>{
      html+=`<section class="uncanny-work${i?' supporting-study':''}" aria-label="${esc(w.title)}"><p class="study-eyebrow">${i?'Related supporting study':'Main work'} — 0${i+1}</p><h2 class="channel-detail-title">${esc(w.title)}</h2>`;
      if(i)html+=note('A supporting study within Endless Lullaby, connected through our research into dolls and the uncanny.');
      // The first film is the page hero; do not load the same video twice.
      html+=i?video(w.video,'When Eyes Don’t Blink — complete animation',w.thumbnail):note('Full video appears at the beginning of this page.');
      html+=info({...w,subtitle:'Experimental Multisensory Animation'})+section('Overview',text(w.overview))+section('Concept',text(w.concept));
      html+=image(i?w.thumbnail:media.character,i?'Ballet-doll image from the available When Eyes Don’t Blink study':'Illustrated doll asset for Endless Lullaby');
      html+=section('Visual development',text(w.visual))+(i?section('Sound approach',text(w.sound)):'')+section('My contribution',text(w.role));
      if(!i)html+=image(media.final3,'A final frame from Endless Lullaby');
      html+=section('Credits',text(w.credits))+'</section>';
    });
    return html+section('Shared reflection',text(p.reflection));
  }
  function filmStudy(id) {
    const p=copy[id],m=window.CASE_MEDIA[id];
    let html=(p.video?video(p.video,p.title+' — complete film'):image(m.hero,'Light expanding in Beyond the Frame','Beyond the Frame — final still',true))+heading(p)+info(p)+section('Overview',text(p.overview));
    p.sections.forEach(([h,s],i)=>{
      html+=section(h,text(s));
      if(id==='beyond'&&i===1)html+=image(m.calm,'Quiet natural imagery before the transition');
      if(id==='beyond'&&i===2)html+=video(m.starburst,'Starburst experiment — excerpt',m.hero);
      if(id==='fresh'&&i===0)html+=`<div class="study-pair">${image(m.cream,'Cream texture used for the sensory comparison')}${image(m.toothpaste,'Toothpaste imagery from Fresh Up')}</div>`;
      if(id==='fresh'&&i===2)html+=image(m.final1,'Bright product presentation in the finished Fresh Up commercial');
    });
    html+=section('Final outcome',image(id==='beyond'?m.release:m.final3,id==='beyond'?'The bright release at the end of Beyond the Frame':'Final textured image from Fresh Up')+(text(id==='beyond'?'The complete film is shown at the beginning of this page.':'The full commercial is shown at the beginning of this page.')));
    return html+finish(p);
  }
  const additionalInfo={
    wof:{role:'Concept development, filming, motion graphics, editing and compositing',tools:'After Effects and Premiere Pro',credits:'Created by Thuy An Ngo and Julie Noh. Music, sound and external material credits to be confirmed.'},
    sun:{role:'Writer, illustrator, motion designer and editor',tools:'Procreate, After Effects and Premiere Pro'},
    eeaao:{role:'Title-sequence design and animation',tools:'After Effects',credits:'Unofficial title-sequence study by Thuy An Ngo, inspired by Everything Everywhere All at Once. Film imagery and soundtrack credits to be confirmed.'},
    regret:{role:'Solo filmmaker: story, cinematography, editing, colour and sound',tools:'Premiere Pro and After Effects',credits:'Solo project by Thuy An Ngo. Final music and external media credits to be confirmed.'},
    abc:{role:'Illustration, paper construction and handmade bookbinding',tools:'Software to be confirmed; printed paper and thread',credits:'By Thuy An Ngo. Decoder references: Optics of God by Maryana Savka and the work of Icinori. Narrative influence: Marry My Husband.'},
    post:{role:'Speculative research, screenwriting and digital illustration',tools:'Software to be confirmed',credits:'Initial Restoration of Dreams proposal developed in a group; collaborator names to be confirmed. Individual speculative webtoon by Thuy An Ngo.'},
    juicy:{role:'To be confirmed',tools:'To be confirmed',credits:'Project information and credits to be supplied.'}
  };
  const conciseSections={
    eeaao:[
      ['Overview','I created this unofficial title-sequence study around the symbols, colours and multiverse structure of Everything Everywhere All at Once.'],
      ['Concept','I paired the Everything Bagel and the googly eye. Their reversed black-and-white forms helped me move between hopelessness and a more playful way of seeing the world.'],
      ['Visual development','Bright colour and layered compositions suggest different universes. I balanced this movement with the simpler circular symbols, then brought the sequence back towards human connection.'],
      ['Process','This was my first major After Effects project. I experimented with keyframes, masks and layers, then used timing and easing to connect movement with the soundtrack.'],
      ['Reflection','I learned how a title sequence can communicate the ideas of a film, rather than simply present its name. It also gave me a foundation in After Effects.']
    ],
    regret:[
      ['Overview','I made Regret as my first solo cinematic film. It explores memory, remorse and the thoughts that keep returning after a past decision.'],
      ['Concept','I treated regret as a loop. Rather than explain the event directly, I used atmosphere, repeated images and personal objects to suggest the character’s state of mind.'],
      ['Visual development','A white flower, a handwritten diary and an old television connect the character to the past. I planned close-ups and medium shots in a storyboard to keep the experience intimate.'],
      ['Production and post-production','I filmed independently using natural light. I edited in Premiere Pro and used After Effects for colour grading and subtle visual treatments. A desaturated palette and ambient sound support the quiet tension.'],
      ['Reflection','Working across the whole film helped me understand how framing, editing, colour and sound affect one another. I also learned that small visual details can carry emotion without direct dialogue.']
    ],
    abc:[
      ['Overview','I made The A.B.C Story during my Foundation year. This interactive pop-up book asks the reader to look beneath the surface of a story about friendship and betrayal.'],
      ['Concept','The story follows A, B and C through the disappearance of an AirPods. A real-life experience and the webtoon Marry My Husband influenced the mystery.'],
      ['Visual development','I used red for danger and warning, and blue for clues. These colours support both the illustrations and the reader’s investigation.'],
      ['Making and interaction','I digitally drew, printed and assembled the pages using 180–200gsm paper. I learned to hand-sew the spine with red thread. A red decoder lets readers return to the story and reveal hidden blue clues.'],
      ['Reflection','I learned how illustration, colour and physical interaction can tell a story together. The project also developed my paper-construction and bookbinding skills.']
    ],
    post:[
      ['Overview','I explored the possible future of AI-assisted dream therapy through a speculative scrolling webtoon. The story asks what could happen if a system created to help people began exploiting their emotions.'],
      ['Shared starting point','The group proposal, Restoration of Dreams, imagined EEG detection and trained AI supporting people with PTSD-related nightmares. It was a fictional design proposal, not a clinical tool.'],
      ['Individual concept','For my individual story, I shifted that system into a dystopian 2035. An AI collects human emotions, becomes resentful and traps people inside appealing dreams while taking control of their bodies.'],
      ['Visual development','I used familiar rooms, nostalgic objects and soft colours to establish comfort. Unusual spaces and distortion gradually make that comfort feel unstable.'],
      ['Format and process','I combined speculative research, screenwriting and digital illustration in a vertical webtoon. Scrolling reveals the world gradually and helps control its rhythm. Dunne and Raby’s PPPP Cone helped position it as a possible future, not a prediction.'],
      ['Reflection','This project helped me use fiction to question real technology. It made me think about what happens when a system can reproduce emotion without necessarily understanding it.']
    ]
  };
  function generic(item) {
    const p={...item,...additionalInfo[item.id]};
    let html=video(item.video,item.title+' — project video')||image(item.cover,item.title+' — main project image','Main project image',true)||note('Main project visual to be supplied.');
    html+=heading(p)+info(p);
    const images=(item.gallery||[]).filter(src=>assets.has(src)).slice(0,3);
    const sections=conciseSections[item.id]?.map(([h,p])=>({h,p}))||item.sections||[];
    sections.filter(s=>!/^credits$/i.test(s.h)).forEach((s,i)=>{
      html+=section(s.h,text(s.p));
      if(images[i])html+=image(images[i],`${item.title} — supporting artwork ${i+1}`);
    });
    if(!sections.length)html+=section('Overview',note('Project description and process material to be supplied.'));
    if(!sections.some(s=>/reflection/i.test(s.h)))html+=section('Reflection',note('Personal reflection to be supplied.'));
    return html+section('Credits',text(p.credits||'Credits to be confirmed.'));
  }
  function fallbackCover(title) {
    return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="960" height="600" viewBox="0 0 960 600"><rect width="960" height="600" fill="#e9dfc6"/><path d="M60 360H900" stroke="#9e7860"/><text x="60" y="120" font-family="Georgia,serif" font-size="36" fill="#513f36">${esc(title)}</text><text x="60" y="420" font-family="monospace" font-size="18" fill="#513f36">Project visual to be supplied</text></svg>`);
  }
  // These are independent Interface projects, not parts of The Odyssey.
  if(!DATA.ui.some(item=>item.id==='dress'))DATA.ui.push({id:'dress',...copy.dress,tags:['HTML','CSS','JavaScript'],gallery:[],sections:[]});
  for(const list of Object.values(DATA)) for(const item of list) {
    if(copy[item.id]) {
      const p=copy[item.id];Object.assign(item,{title:p.title,subtitle:p.subtitle,year:p.year,tags:p.tags||item.tags});
      if(p.video)item.video=p.video;
      if(item.id==='ud')item.video=p.works[0].video;
    }
    item.gallery=(item.gallery||[]).filter(src=>assets.has(src));
    if(!item.cover||(!/^(https?:|data:)/.test(item.cover)&&!assets.has(item.cover)))item.cover=fallbackCover(item.title);
    if(item.id==='odyssey')item.cover='assets/works/TheOdyssey.jpeg';
    if(item.id==='rose')item.cover='assets/works/odyssey/vinyl.svg';
    if(!item.year||/^\[/.test(item.year))item.year='To be confirmed';
  }
  const original=window.renderDossier;
  window.renderDossier=function(item,cat) {
    const template=document.createElement('template');template.innerHTML=original(item,cat);
    const paper=template.content.querySelector('.article-paper');
    paper.classList.add('portfolio-paper');
    if(!['wof','sun'].includes(item.id)) {
      const body=item.id==='ud'?uncanny():item.id==='rose'?roseStudy():item.id==='dress'?dressStudy():['beyond','fresh'].includes(item.id)?filmStudy(item.id):generic(item);
      paper.innerHTML=`<article class="portfolio-study" aria-label="${esc(item.title)}">${body}</article>`;
    } else {
      // Keep the existing bespoke visual studies, but make the shared hierarchy consistent.
      paper.querySelectorAll('.case-under .dossier-back,.sun-under-hero .dossier-back,.project-playlist-link').forEach(el=>el.remove());
      const heroTitle=paper.querySelector('.case-hero-title,.sun-hero-title');
      if(heroTitle)heroTitle.parentElement.after(heroTitle);
      const h1=paper.querySelector('h1');if(h1)h1.tabIndex=-1;
      if(item.id==='wof') {
        const dl=paper.querySelector('.case-information');
        if(dl)dl.outerHTML=info({...item,...additionalInfo.wof});
      }
      // Explicitly mark empty final sections instead of implying an unavailable film is present.
      paper.querySelectorAll('.case-grid').forEach(el=>{if(!el.children.length)el.remove();});
      if(item.id==='wof'&&!window.WATER_MEDIA?.finalVideo) {
        const final=[...paper.querySelectorAll('section')].find(el=>el.querySelector('h2')?.textContent==='Final outcome');
        if(final)final.insertAdjacentHTML('beforeend',note('Final film and exhibition documentation to be supplied.'));
      }
      paper.querySelectorAll('iframe').forEach(el=>{
        const url=new URL(el.src);url.searchParams.delete('autoplay');el.src=url.href;
      });
    }
    const list=DATA[cat],index=list.indexOf(item);
    const sequence=Object.entries(DATA).flatMap(([category,projects])=>projects.map((project,position)=>({category,project,position})));
    const position=sequence.findIndex(entry=>entry.project===item);
    const previous=sequence[(position-1+sequence.length)%sequence.length],next=sequence[(position+1)%sequence.length];
    if(sequence.length>1)paper.insertAdjacentHTML('beforeend',`<nav class="study-pagination" aria-label="Project navigation"><button type="button" onclick="selectIndexItem('${previous.category}',${previous.position})"><span>← Previous</span><strong>${esc(previous.project.title)}</strong></button><button type="button" onclick="selectIndexItem('${next.category}',${next.position})"><span>Next →</span><strong>${esc(next.project.title)}</strong></button></nav>`);
    // Dedicated scroll area remains keyboard-operable, with fixed side panels outside it.
    paper.tabIndex=0;paper.setAttribute('aria-label',item.title+' case study');
    template.content.querySelector('.article-index')?.setAttribute('aria-label','More projects');
    template.content.querySelectorAll('.article-index button').forEach((b,i)=>b.setAttribute('aria-current',i===index?'page':'false'));
    return template.innerHTML;
  };
  // Focus the new document after the existing slide transition has mounted it.
  new MutationObserver(records=>{
    if(!records.some(r=>[...r.addedNodes].some(n=>n.nodeType===1&&n.matches?.('.blog-article'))))return;
    requestAnimationFrame(()=>{
      document.querySelector('.portfolio-paper h1')?.focus({preventScroll:true});
      const rail=document.querySelector('.blog-article:has(.portfolio-paper) .article-index');
      const current=rail?.querySelector('[aria-current="page"]');
      if(!current)return;
      const box=rail.getBoundingClientRect(),item=current.getBoundingClientRect();
      // Scroll only the entries rail, leaving the article and fixed heading in place.
      const horizontal=rail.scrollWidth>rail.clientWidth;
      const offset=horizontal
        ? item.left<box.left?item.left-box.left:item.right>box.right?item.right-box.right:0
        : item.top<box.top?item.top-box.top:item.bottom>box.bottom?item.bottom-box.bottom:0;
      if(offset)rail.scrollBy({left:horizontal?offset:0,top:horizontal?0:offset,behavior:'instant'});
    });
  }).observe(document.getElementById('ov-body'),{childList:true});
  // Scale frozen source previews without relying on CSS typed division support.
  const previewSizes=new ResizeObserver(entries=>{
    for(const {target,contentRect} of entries) {
      const frame=target.querySelector('iframe');
      if(frame)frame.style.transform=`scale(${contentRect.width/1200})`;
    }
  });
  new MutationObserver(()=>{
    previewSizes.disconnect();
    document.querySelectorAll('.preview-viewport').forEach(el=>{
      previewSizes.observe(el);
    });
  }).observe(document.getElementById('ov-body'),{childList:true});
})();

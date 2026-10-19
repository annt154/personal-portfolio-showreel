(() => {
  const p=window.UNDER_FOREST,m=p.media;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const paragraph=key=>`<p>${esc(p.copy[key])}</p>`;
  const pending=label=>`<div class="forest-pending"><span>${esc(label)}</span><small>Asset to be supplied</small></div>`;
  const figure=(src,label)=>src?`<figure><img src="${esc(src)}" alt="${esc(label)}" loading="lazy" decoding="async"><figcaption>${esc(label)}</figcaption></figure>`:pending(label);
  const section=(n,title,body)=>`<section class="forest-section"><header><span>${n}</span><h2>${title}</h2></header>${body}</section>`;
  const allVideos=()=>!!(m.left&&m.middle&&m.right);
  function viewer(id){
    const available=allVideos();
    return `<section class="forest-viewer" data-forest-viewer aria-label="Synchronised three-channel viewer"><div class="forest-screen" id="${id}"><div class="forest-channel-labels"><span>Left channel</span><span>Middle channel</span><span>Right channel</span></div>${available?`<div class="forest-triptych">${['left','middle','right'].map(key=>`<video data-channel="${key}" src="${esc(m[key])}" playsinline preload="none" aria-label="${key} projection channel"></video>`).join('')}</div><img class="forest-poster" src="${esc(m.poster)}" alt="Installation test photograph before playback">`:`<img class="forest-installation-poster" src="${esc(m.poster)}" alt="Projector testing photograph of The Under-Forest"><p class="forest-poster-caption">Installation test photograph · three video files pending</p>`}</div><div class="forest-controls"><button type="button" data-play ${available?'':'disabled'}>Play</button><label class="forest-timeline">Timeline<input type="range" min="0" max="0" step="0.01" value="0" data-timeline aria-label="Seek all three channels" disabled></label><output data-time>0:00 / 0:00</output><button type="button" data-sound ${available?'':'disabled'} aria-pressed="true">Mute sound</button><button type="button" data-fullscreen>Fullscreen</button></div><p class="forest-player-status" data-status role="status">${available?'Ready · sound plays from the middle channel only.':'Awaiting Left, Middle and Right web-ready video files.'}</p>${m.combined?`<a class="forest-combined" href="${esc(m.combined)}" target="_blank" rel="noopener noreferrer">WATCH COMBINED VERSION ↗</a>`:'<button type="button" class="forest-combined" disabled>WATCH COMBINED VERSION</button><small class="forest-missing">Combined video to be supplied</small>'}</section>`;
  }
  const installationDiagram=()=>`<figure class="forest-diagram"><svg viewBox="0 0 650 320" role="img" aria-label="Schematic C-shaped installation: middle screen ahead, left and right screens around the audience"><path d="M135 230V65H515V230" fill="none" stroke="#91ab8e" stroke-width="9"/><path d="M145 90L300 220M500 90L350 220M325 78V198" stroke="#719ba5" stroke-dasharray="5 8" fill="none"/><circle cx="325" cy="237" r="20" fill="#d2bd8e"/><g fill="#e2e7d8" font-family="monospace" font-size="15"><text x="285" y="40">MIDDLE</text><text x="64" y="160">LEFT</text><text x="543" y="160">RIGHT</text><text x="280" y="292">AUDIENCE</text></g></svg><figcaption>Explanatory schematic of the supplied C-shaped arrangement; not an installation photograph.</figcaption></figure>`;
  const layersDiagram=()=>`<figure class="forest-diagram"><svg viewBox="0 0 650 330" role="img" aria-label="Exploded schematic of foreground, midground and background planes along the Z-axis"><g stroke-width="2"><path d="M270 50H550V200H270Z" stroke="#608792" fill="#163139"/><path d="M175 95H455V245H175Z" stroke="#92a67b" fill="#203c32"/><path d="M80 140H360V290H80Z" stroke="#cab783" fill="#35473a"/></g><g fill="#eef0df" font-family="monospace" font-size="16"><text x="290" y="80">Background</text><text x="195" y="125">Midground</text><text x="100" y="173">Foreground</text><text x="470" y="285">Z-axis →</text></g></svg><figcaption>Explanatory layer diagram based on the supplied process description.</figcaption></figure>`;
  function render(){
    const story=[['ENTER','The viewer enters a dark grass environment from ground level.'],['SEARCH','Layered plants move around the viewer as the path becomes narrower and less familiar.'],['IMPACT','A descending human foot becomes the visual and sonic climax.'],['ENDURE','The final view opens towards the sky, shifting the story from powerlessness towards biological resilience.']];
    return `<article class="underforest" aria-label="${esc(p.title)}">${viewer('forest-hero')}<header class="forest-header"><p>${p.year}</p><h1 tabindex="-1">${p.title}</h1><p class="forest-subtitle">${p.subtitle}</p><p>${p.tags}</p></header><dl class="study-info forest-info">${[['Created by',p.creators],['My contribution',p.role],['Tools',p.tools],['Format',p.subtitle]].map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`+
      section('01','Overview',`<div class="forest-two"><div>${paragraph('overview')}${paragraph('overview2')}</div>${figure(m.overview,'Final worm’s-eye-view still')}</div>`)+
      section('02','Concept — Culture shock',`<div class="forest-steps">${['Familiar Environment','Loss of Scale','Unseen Pressure','Adaptation'].map(s=>`<span>${s}</span>`).join('')}</div>${paragraph('concept')}${paragraph('concept2')}`)+
      section('03','Story',`<div class="forest-story">${story.map(([title,description],i)=>`<div class="forest-story-step">${figure(m.story[i],title+' — final frame')}<div class="forest-story-caption"><h3>${title}</h3><p>${description}</p></div></div>`).join('')}</div>`)+
      section('04','Spatial installation',installationDiagram()+figure(m.poster,'Photograph from projector testing')+paragraph('spatial')+paragraph('spatial2')+'<div class="forest-steps"><span>Peripheral Vision</span><span>Architectural Scale</span><span>Shared Spatial Experience</span></div>')+
      section('05','Visual development',figure(m.final,'Final composited environment')+paragraph('visual')+`<div class="forest-grid">${figure(m.reference,'Worm’s-eye-view reference photography')}${figure(m.assets,'Grass, flower, tree and mushroom assets')}${figure(m.colour,'Dark environmental colour tests')}</div>`)+
      section('06','From multiplane to 360°','<div class="forest-steps"><span>2D MULTIPLANE ENVIRONMENT</span><span aria-hidden="true">→</span><span>360° PRACTICAL CLIMAX</span></div>'+paragraph('multiplane')+paragraph('practical'))+
      section('07','Technical breakdown',`<div class="forest-grid">${[['Asset Preparation','Layered images prepared in Photoshop'],['Depth and Movement','Assets arranged and animated along the Z-axis in After Effects'],['Three-Channel Composition','The completed environment divided and adjusted for Left, Middle and Right projections']].map(([h,t])=>`<div><h3>${h}</h3><p>${t}</p></div>`).join('')}</div>`+layersDiagram())+
      section('08','Transition development',(m.transition?`<video class="forest-excerpt" src="${esc(m.transition)}" controls playsinline preload="none" aria-label="Multiplane to 360-degree transition comparison"></video>`:pending('Multiplane → 360° transition comparison'))+paragraph('transition'))+
      section('09','Three-screen composition problem',`<div class="forest-two">${figure(m.before,'Centre screen — before adjustment')}${figure(m.after,'Centre screen — after adjustment')}</div>`+paragraph('composition')+paragraph('vignette'))+
      section('10','Sound and presence','<div class="forest-sound-map" role="img" aria-label="Conceptual sound map: left environment, central pathway and footstep, right environment"><span>Left environment</span><span>Pathway · Footstep</span><span>Right environment</span></div><p class="forest-caption">Conceptual sound map; exact speaker routing to be confirmed.</p>'+paragraph('sound')+paragraph('sound2'))+
      section('11','AI and source-material disclosure',paragraph('ai')+paragraph('ai2'))+
      section('12','Final outcome',viewer('forest-final')+`<div class="forest-grid">${['Entering the Forest','Revealing Scale','Biological Resilience'].map((label,i)=>figure(m.finalStills[i],label)).join('')}</div>`)+
      section('13','Reflection',paragraph('reflection')+paragraph('reflection2'))+
      section('14','Credits',`<p>Created by ${p.creators}</p><p>Visual development, animation, compositing and editing: ${p.creators}</p><p>Format: ${p.subtitle}</p><p>Tools: ${p.tools}</p><div class="forest-credit-pending"><p>External sound and licences: to be supplied.</p><p>External footage and licences: to be supplied.</p><p>AI tools, models and generated-source credits: to be supplied.</p><p>Reference photography and other source material: credits to be supplied.</p></div>`)+ '</article>';
  }
  const item=DATA.animation.find(x=>x.id==='odyssey');
  Object.assign(item,{title:p.title,subtitle:p.subtitle,year:p.year,tags:p.tags.split(' · '),cover:m.poster});
  const original=window.renderDossier;
  window.renderDossier=(item,cat)=>{
    const html=original(item,cat);if(item.id!=='odyssey')return html;
    const t=document.createElement('template');t.innerHTML=html;
    const paper=t.content.querySelector('.article-paper');paper.classList.add('underforest-paper');
    paper.querySelector('.portfolio-study').outerHTML=render();
    return t.innerHTML;
  };
  let mounted=[];
  const format=t=>`${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,'0')}`;
  new MutationObserver(()=>{
    mounted.forEach(controller=>controller.destroy());mounted=[];
    document.querySelectorAll('[data-forest-viewer]').forEach(view=>{
      const videos=[...view.querySelectorAll('.forest-triptych video')];
      const full=view.querySelector('[data-fullscreen]');
      full.onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(view.requestFullscreen)await view.requestFullscreen();else view.querySelector('[data-status]').textContent='Fullscreen is unavailable here. Rotate your device for a wider view.';}catch{view.querySelector('[data-status]').textContent='Fullscreen is unavailable here. Rotate your device for a wider view.';}};
      if(videos.length!==3)return;
      const play=view.querySelector('[data-play]'),timeline=view.querySelector('[data-timeline]'),sound=view.querySelector('[data-sound]');
      let state;
      const controller=window.createForestTransport(videos,next=>{
        state=next;play.textContent=next.wanted?'Pause':'Play';timeline.disabled=!next.duration;timeline.max=next.duration;timeline.value=next.time;
        view.querySelector('[data-time]').textContent=`${format(next.time)} / ${format(next.duration)}`;
        sound.textContent=next.muted?'Enable sound':'Mute sound';sound.setAttribute('aria-pressed',String(!next.muted));
        if(next.playing)view.querySelector('.forest-poster')?.setAttribute('hidden','');
        if(next.message)view.querySelector('[data-status]').textContent=next.message;
      });
      mounted.push(controller);
      play.onclick=()=>{if(state.wanted)controller.pause();else{mounted.filter(c=>c!==controller).forEach(c=>c.pause());controller.play();}};
      timeline.oninput=()=>controller.seek(timeline.value);sound.onclick=()=>controller.sound();
    });
  }).observe(document.getElementById('ov-body'),{childList:true});
})();

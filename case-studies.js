(() => {
 const media=window.CASE_MEDIA;
 const text=s=>`<p class="case-copy">${s}</p>`;
 const image=(id,key,label)=>media[id]?.[key]?`<figure class="case-figure"><img src="${media[id][key]}" alt="${label}" loading="lazy"><figcaption>${label}</figcaption></figure>`:`<figure class="case-figure case-pending" data-media="${id}/${key}"><figcaption>${label}</figcaption></figure>`;
 const grid=(id,keys,labels)=>`<div class="case-grid">${keys.map((key,i)=>image(id,key,labels[i])).join('')}</div>`;
 const section=(title,body,cls='')=>`<section class="case-section ${cls}"><h2>${title}</h2>${body}</section>`;
 function video(url,title,loop=false) {
  if(!url)return '';
  const embed=projectVideoEmbed(url);
  return `<div class="case-video">${embed?`<iframe src="${embed}?controls=1&rel=0" title="${title}" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>`:`<video src="${url}" aria-label="${title}" controls playsinline preload="metadata" ${loop?'loop muted':''}></video>`}</div>`;
 }
 const projects={
  beyond:{video:'https://youtu.be/G0cSvIk3nr0',title:'Beyond the Frame',subtitle:'Solo Experimental Short Film',year:'2025',tags:['Cinematography','VFX','Projection Experiments','Sound'],info:[['My role','Cinematography, editing, colour grading, visual effects and sound-design layering'],['Created by','Thuy An Ngo']],
   overview:'Beyond the Frame is an experimental film exploring the sublime—the feeling created when fear, beauty and awe exist at the same time. The project began as an attempt to transform a peaceful natural environment into terror, but experimentation gradually shifted the outcome towards wonder, liberation and transcendence.',
   reflection:'This project changed how I understood fear in my creative practice. Fear does not always need to end in discomfort; it can also lead towards curiosity, freedom and awe. The process strengthened my confidence in visual experimentation, projection testing, VFX and independent film production.',
   credits:['Created independently by Thuy An Ngo','My contribution: Cinematography, editing, colour grading, visual effects and sound-design layering']},
  ud:{title:'Endless Lullaby',subtitle:'Experimental Multisensory Animation',year:'2025',video:'https://youtu.be/xlfaU6L3B9w',tags:['2D Animation','Uncanny Valley','Sound Design'],info:[['My role','Visual Development, Illustration, Animation, Editing and Compositing'],['Collaborator','My Le'],['Sound design','[INSERT SOUND DESIGNER’S NAME]'],['Tools','Procreate, After Effects and Premiere Pro'],['Outcome','Showcased at RMIT BLACK BOX']],note:'This work symbolically explores childhood trauma, violated personal boundaries and repeated harm.',
   overview:'Endless Lullaby uses dolls and childhood toys to explore the uncanny—the discomfort created when something appears familiar and almost human, but still feels slightly wrong.',overview2:'The story presents a fictional cycle in which someone who experiences harm during childhood later repeats that harm instead of escaping it. The subject is communicated indirectly through repetition, fixed expressions, reversed movement and distorted sound.',
   reflection:'This project taught me that a multisensory experience is not created by simply adding sound to an image. Movement, timing, silence and audio need to work together to shape the audience’s emotional response. It also taught me how to develop a collaborator’s original idea while making a clear visual contribution.',credits:['Created with My Le','Sound design: [INSERT SOUND DESIGNER’S NAME]','Visual development, illustration, animation, editing and compositing: Thuy An Ngo']},
  fresh:{title:'Fresh Up',subtitle:'AI-Assisted Experimental Commercial',year:'2025',video:'https://youtu.be/VAt1Eha2OrI',tags:['Direction','Editing','Compositing','Sound'],info:[['My role','Director and Post-Production Lead'],['Tools','AI image/video generation, After Effects and Premiere Pro'],['Focus','Visceral Design and Cross-Modal Perception']],
   overview:'Fresh Up is an experimental commercial exploring how sight and sound can make the viewer imagine taste, texture and physical discomfort without directly experiencing them.',
   reflection:'Fresh Up showed me how visual and audio information can work together to trigger a bodily reaction. It also taught me that AI-generated footage is not a finished outcome by itself. The final experience came from direction, selection, colour treatment, editing, compositing and sound.',disclosure:'AI-generated footage was used as source material. Concept development, direction, footage selection, editing, colour treatment, compositing and visual effects were completed by Thuy An Ngo.'}
 };
 function sections(id,p) {
  let html=section('Overview',`<div class="case-two"><div>${text(p.overview)}${p.overview2?text(p.overview2):''}</div>${image(id,'overview',id==='beyond'?'A familiar natural environment':id==='ud'?'A familiar face, held still':'Fresh Up — final product frame')}</div>`);
  if(id==='beyond') {
   html+=section('Concept development',grid(id,['calm','transition','release'],['Serenity →','Uncertainty →','Awe']));
   html+=section('The starburst effect',video(media.beyond.starburst,'Starburst experiment',true)+text('Inspired by the wormhole sequence in 2001: A Space Odyssey, the starburst effect began as an experiment with light and movement. It later became the main transition between the physical environment and an abstract white space.'));
   html+=section('Sound and image',image(id,'sound','Sound development')+text('The sound begins with familiar natural recordings and gradually becomes wider and more overwhelming. Image and sound were developed together to make the environment feel as though it was expanding beyond the screen.'));
   html+=section('Experimentation',grid(id,['projection','mapping','editing'],['Projection testing','Mapping experiments','Editing and refinement'])+text('Early projection experiments did not create the intended emotional change, leading the project towards a more cinematic and abstract final form.'),'case-process');
   html+=section('Final outcome',grid(id,['calm','transition','release'],['Familiar Space','Expansion','Release']));
  } else if(id==='ud') {
   html+=section('Preliminary Study',`<h3>When Eyes Don’t Blink</h3>${video(media.ud.study,'When Eyes Don’t Blink',true)}${text('When Eyes Don’t Blink was an early study of repetition, stillness and mechanical movement. Repeating the ballet doll’s movement and sound showed how a simple, familiar action could gradually become uncomfortable.')}`,'case-inset');
   html+=section('The uncanny valley',`<div class="case-two">${image(id,'illustration','Original doll illustration')}<div>${text('Dolls were selected because they have human faces, bodies and expressions, yet remain still objects. Their connection to childhood and play makes their lifeless appearance feel both familiar and unsettling.')}</div></div>`);
   html+=section('Visual development',grid(id,['character','room','composition','colour'],['Main doll character','Toy and room assets','Early compositions','Colour development'])+text('Playful childhood imagery was repeated, enlarged and rearranged to slowly disturb its original meaning. Familiar objects remain recognisable, but their stillness and repetition make the environment increasingly uncomfortable.'));
   html+=section('Animation and compositing',grid(id,['layers','compositing','overview'],['Separated Procreate assets →','After Effects composition →','Final frame'])+text('The illustrated assets were separated into layers and animated in After Effects. Repetition, stillness and unusual timing were used to make small movements feel more intense.'));
   html+=section('Sound design',video(p.video,'Endless Lullaby — sound design')+text('Reversed audio, repetition, silence and distorted textures were developed alongside the visuals. Sound was used to change how the audience physically and emotionally interpreted each movement.'));
   html+=section('Final outcome',video(p.video,'Endless Lullaby — full animation')+grid(id,['final1','final2','final3'],['Stillness','Repetition','The cycle']));
  } else {
   html+=section('Concept',grid(id,['cream','toothpaste'],['Cream — soft, familiar and appealing','Toothpaste — clean and visually similar, but unexpected as food'])+text('To me, “visceral” means feeling something in the body before fully understanding it. Food became the main subject because our senses are trained by it every day. Toothpaste and cream look similar in colour and texture, but their tastes and purposes are completely different. Placing toothpaste on familiar foods interrupts the viewer’s expectations.'));
   html+=section('Cross-modal perception',grid(id,['texture1','texture2','texture3'],['See the texture →','Imagine the taste →','Feel the reaction'])+text('The images encourage the viewer to imagine taste through sight. Wet, sticky and slurping sounds strengthen the imagined experience, allowing the body to react before the scene is fully processed.'));
   html+=section('Visual direction',grid(id,['final1','final2','final3'],['Product appeal','Exaggerated presentation','Unsettling detail'])+text('Bright product shots and exaggerated presentation initially make the commercial appear familiar and trustworthy. VHS noise, excessive close-ups and unusual colour gradually make the same visual world feel raw and unsettling.'));
   html+=section('AI and post-production workflow',grid(id,['raw','selection','composite'],['Raw AI Generation →','Footage Selection →','Final Composite'])+text('AI-generated footage was used as source material. I directed the generations, selected the most effective clips and processed the footage through editing, Hue-to-Hue colour mapping, VHS effects and compositing.'),'case-process');
   html+=section('Sound design',video(p.video,'Fresh Up — sound design')+text('Sound was treated as part of the physical experience rather than background decoration. Slurping, sticky and wet textures were synchronised with the movement of the food to amplify the imagined taste.'));
   html+=section('Final outcome',video(p.video,'Fresh Up — full commercial')+grid(id,['final1','final2','final3'],['Familiar','Unexpected','Visceral']));
  }
  html+=section('Reflection',text(p.reflection),'case-reflection');
  if(p.credits)html+=section('Credits',p.credits.map(text).join(''),'case-credits');
  if(p.disclosure)html+=section('AI disclosure',text(p.disclosure),'case-credits');
  return html;
 }
 for(const [id,p] of Object.entries(projects))Object.assign(DATA.animation.find(x=>x.id===id),{title:p.title,subtitle:p.subtitle,year:p.year,tags:p.tags,video:p.video||'',sections:[],cover:media[id].hero});
 for(const list of Object.values(DATA))if(Array.isArray(list))for(let i=list.length-1;i>=0;i--)if(/when eyes don.t blink/i.test(list[i].title||''))list.splice(i,1);
 const original=window.renderDossier;
 window.renderDossier=function(item,cat) {
  const p=projects[item.id];if(!p)return original(item,cat);
  const template=document.createElement('template');template.innerHTML=original(item,cat);
  const paper=template.content.querySelector('.article-paper');paper.classList.add('editorial-paper');
  const hero=p.video?video(p.video,p.title+' — final film'):image(item.id,'hero',p.title);
  paper.innerHTML=`<article class="case-study" aria-label="${p.title}"><header class="case-hero">${hero}<div class="case-hero-title"><span>${p.year}</span><h1>${p.title.toUpperCase()}</h1><span>${p.subtitle}</span></div></header><div class="case-under"><p>${p.tags.join(' · ')}</p><button class="dossier-back" type="button" onclick="backToIndex('${cat}')">← album</button></div><dl class="case-information">${p.info.map(([key,value])=>`<div><dt>${key}</dt><dd>${value}</dd></div>`).join('')}</dl>${p.note?`<p class="case-content-note">${p.note}</p>`:''}${sections(item.id,p)}</article>`;
  return template.innerHTML;
 };
})();

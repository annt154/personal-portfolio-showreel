// An editorial treatment scoped to The Sun; other dossiers retain their renderer.
(() => {
  const sun = DATA.animation.find(project => project.id === 'sun');
  sun.title = 'The Sun';
  sun.video = 'https://youtu.be/qasYKUCbEoU';
  sun.cover = 'assets/works/the-sun/solar-system.jpg';
  const originalDossier = window.renderDossier;
  const root = 'assets/works/the-sun/';
  const still = (file, alt, caption = '') => `<figure><img src="${root}${file}.jpg" alt="${alt}" loading="lazy" width="720" height="480">${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
  // SVG viewports crop original artwork non-destructively, without storyboard boxes.
  const crop = (file, box, width, height, alt) => `<svg class="sun-process-image" viewBox="${box}" role="img" aria-label="${alt}" xmlns="http://www.w3.org/2000/svg"><image href="${root}${file}" width="${width}" height="${height}"/></svg>`;
  window.renderDossier = function(item, cat) {
    const original = originalDossier(item, cat);
    if (item.id !== 'sun') return original;
    const template = document.createElement('template');
    template.innerHTML = original;
    const paper = template.content.querySelector('.article-paper');
    paper.classList.add('sun-paper');
    paper.innerHTML = `<div class="sun-case">
      <header class="sun-hero">
        <iframe src="https://www.youtube-nocookie.com/embed/qasYKUCbEoU?autoplay=1&mute=1&controls=1&playsinline=1&rel=0" title="The Sun — final animation" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
        <div class="sun-hero-title"><span>2026</span><h1>THE SUN</h1><span>Independent Short Animation</span></div>
      </header>
      <div class="sun-under-hero"><p>2.5D Motion Design · Visual Storytelling</p><button class="dossier-back" type="button" onclick="backToIndex('animation')">← playlist</button></div>
      <dl class="sun-info">
        <div><dt>Role</dt><dd>Writer, Illustrator, Motion Designer and Editor</dd></div>
        <div><dt>Tools</dt><dd>Procreate, After Effects and Premiere Pro</dd></div>
        <div><dt>Format</dt><dd>Independent Short Animation</dd></div>
        <div><dt>Outcome</dt><dd>Exhibited at RMIT BLACK BOX, 2026</dd></div>
      </dl>
      <section class="sun-section sun-two-col">
        <div><h2>Overview</h2><p>The Sun is an independent short animation about parental love and the distance needed to develop an independent identity. The solar system becomes a metaphor for a family: the Sun represents a mother, while the planets represent her children.</p></div>
        ${still('solar-system', 'The Sun surrounded by planets in the final animation')}
      </section>
      <section class="sun-section sun-two-col sun-concept">
        <div><h2>Concept and metaphor</h2><p>The Sun gives the planets light, warmth and the conditions needed for life, reflecting a parent’s role as a source of care and safety. However, the planets also need the correct distance to survive. Too far away, they lose the Sun’s warmth; too close, that same warmth becomes destructive.</p><p>Their orbits first represent safety and connection, but gradually become fixed paths the children are not allowed to leave. As the planets seek independence, the Sun experiences their distance as rejection and intensifies her light and gravity in an attempt to keep them close.</p></div>
        <figure>${crop('Untitled_Artwork 2 (2).png','390 35 2640 1650',4096,1714,'Yellow Sun, Red Giant, White Dwarf and Black Dwarf development')}<figcaption>The Sun’s physical life cycle becomes an emotional arc from care to control and isolation.</figcaption></figure>
      </section>
      <section class="sun-section"><h2>Character and symbol development</h2><figure>${crop('Untitled_Artwork 1 (1).png','290 240 3760 1130',4096,1714,'Earth expressions and the planet character designs')}<figcaption>Early visual development for the planets and their emotional expressions.</figcaption></figure></section>
      <section class="sun-section"><h2>Narrative development</h2><p class="sun-intro">The storyboard gradually shifts from open, balanced compositions to tighter framing and more dominant uses of red. This visual progression reflects the change from parental care to emotional pressure.</p><div class="sun-sequence">
        <figure>${crop('Untitled_Artwork 3.png','830 885 760 425',2420,1668,'Warmth: Sun and planets in balanced orbits')}<figcaption>Warmth <span aria-hidden="true">→</span></figcaption></figure>
        <figure>${crop('Untitled_Artwork 2.png','835 195 755 420',2420,1668,'Distance: Earth turns away from the Sun')}<figcaption>Distance <span aria-hidden="true">→</span></figcaption></figure>
        <figure>${crop('Untitled_Artwork 1.png','835 885 755 420',2420,1668,'Control: the expanding Red Giant approaches a planet')}<figcaption>Control</figcaption></figure>
      </div></section>
      <section class="sun-section sun-tarot"><h2>Tarot symbolism</h2><div class="sun-two-col">
        ${still('tarot-sun', 'The warm rising Sun in the final animation', 'The Sun — warmth, vitality and care')}
        ${still('red-giant', 'The overwhelming red Sun in the final animation', 'The Devil — attachment, guilt and emotional control')}
      </div><p>Tarot imagery supports the Sun’s emotional transformation. The transition from The Sun to The Devil suggests that love becomes harmful when it is used to control another person or prevent an independent identity from forming.</p></section>
      <section class="sun-section sun-outcome"><h2>Final outcome</h2>
        ${still('solar-system', 'The balanced solar system', 'Warmth')}
        <div class="sun-two-col">${still('red-giant', 'The Red Giant transformation', 'Control')}${still('isolation', 'The isolated White Dwarf in darkness', 'Isolation')}</div>
      </section>
      <section class="sun-section sun-reflection"><h2>Reflection</h2><p>This project developed my ability to translate an emotional subject into a visual metaphor. It also strengthened my skills in narrative development, layered illustration, 2.5D animation and compositing. Most importantly, it showed how distance, scale, light and movement can communicate a relationship without relying entirely on dialogue.</p></section>
      <footer class="sun-section sun-credits"><h2>Credits</h2><p>Concept, writing, illustration, animation, editing and compositing: Thuy An Ngo<br>Voice-over: Generated using Higgsfield Audio<br>Tools: Procreate, Adobe After Effects and Adobe Premiere Pro<br>Music and sound: [insert final credits]</p><a href="https://youtu.be/qasYKUCbEoU" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></footer>
    </div>`;
    return template.innerHTML;
  };
})();

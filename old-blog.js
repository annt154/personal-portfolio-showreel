// Small personal-site links, without imitation browser controls.
(() => {
  const overlay = document.getElementById('overlay');
  const inner = overlay.querySelector('.overlay-inner');
  const heading = inner.querySelector('.overlay-head');
  const back = overlay.querySelector('.overlay-close');
  back.textContent = '←';
  back.setAttribute('aria-label', 'Back to previous page');
  back.title = 'Back';
  back.onclick = () => {
    if (inner.classList.contains('article-mode')) window.backToIndex(overlay.dataset.category);
    else window.closeOverlay();
  };

  const bubbles = document.createElement('img');
  bubbles.className = 'blog-bubbles';
  bubbles.src = 'assets/hello/bubbles.png';
  bubbles.alt = '';
  bubbles.setAttribute('aria-hidden', 'true');
  heading.append(bubbles);

  const footer = document.createElement('footer');
  footer.className = 'blog-footer';
  footer.innerHTML = '<img src="assets/hello/silver-tray.png" alt="" aria-hidden="true"><p>thank you for visiting</p>';
  inner.append(footer);
  inner.addEventListener('click', event => {
    const button = event.target.closest('[data-blog]');
    if (!button) return;
    if (button.dataset.blog === 'home') window.closeOverlay();
    if (button.dataset.blog === 'collection') window.openOverlay(overlay.dataset.category);
    if (button.dataset.blog === 'top') (inner.querySelector('.article-paper') || overlay).scrollTo({top:0, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  });

  // A borderless butter-yellow thought cloud, drawn as a scalable vector.
  const cloud = document.querySelector('#abt .about-cloud');
  const svgNS = 'http://www.w3.org/2000/svg';
  const image = document.createElement('img');
  image.className = 'about-cloud-image';
  image.src = 'assets/hello/butter-cloud.svg';
  image.alt = '';
  image.width = 1000;
  image.height = 700;
  image.setAttribute('aria-hidden', 'true');
  cloud.prepend(image);
  const content = cloud.querySelector('.cloud-content');
  const motionFish = document.getElementById('k1');
  motionFish.querySelector('.flabel').textContent = 'Motion design';
  motionFish.setAttribute('aria-label', 'Open Motion design playlist');
  content.setAttribute('tabindex', '0');
  content.setAttribute('role', 'region');
  content.setAttribute('aria-label', 'About me, education, skills and social links');
  content.removeAttribute('tabindex');
  const cloudLayout = document.createElement('div');
  cloudLayout.className = 'cloud-layout';
  cloudLayout.append(...content.childNodes);
  content.append(cloudLayout);
  function fitCloud() {
    const width = content.clientWidth, height = content.clientHeight;
    if (!width || !height) return;
    cloudLayout.style.width = Math.max(440, width) + 'px';
    const scale = Math.min(1, width / cloudLayout.offsetWidth, height / cloudLayout.scrollHeight);
    cloudLayout.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }
  new ResizeObserver(fitCloud).observe(content);
  image.addEventListener('load', fitCloud);
  document.fonts.ready.then(fitCloud);

  // Each scene owns its birds, so both sets travel with the existing page slide.
  const originalNav = document.querySelector('.corner-nav');
  const actions = [...originalNav.querySelectorAll('.corner-link')];
  ['main', 'abt'].forEach(sceneId => {
    const shoreNav = document.createElement('nav');
    shoreNav.className = 'shore-nav';
    shoreNav.setAttribute('aria-label', 'Showreel and contact');
    actions.forEach(button => {
    const reel = /showreel/i.test(button.textContent);
    const label = reel ? 'showreel' : 'contact me';
    const item = document.createElement('div');
    item.className = 'shore-item';
    const bird = document.createElementNS(svgNS, 'svg');
    bird.setAttribute('class', 'shore-bird ' + (reel ? 'shore-pigeon' : 'shore-pair'));
    bird.setAttribute('viewBox', reel ? '470 110 790 810' : '300 210 1320 700');
    bird.setAttribute('preserveAspectRatio', 'xMidYMax meet');
    bird.setAttribute('aria-hidden', 'true');
    const art = document.createElementNS(svgNS, 'image');
    art.setAttribute('href', 'assets/hello/' + (reel ? 'pigeon.png' : 'birds.png'));
    art.setAttribute('width', '1920');
    art.setAttribute('height', '1080');
    bird.append(art);
    const caption = document.createElement('span');
    caption.className = 'shore-caption';
    caption.textContent = label;
    const link = document.createElement('a');
    link.className = 'shore-link';
    link.href = reel ? '#showreel' : '#contact';
    link.setAttribute('aria-label', label);
    link.onclick = event => { event.preventDefault(); button.click(); };
    link.append(bird, caption);
    item.append(link);
    shoreNav.append(item);
    });
    document.getElementById(sceneId).append(shoreNav);
  });
  originalNav.remove();
  const viewport = document.getElementById('vp');
  function syncBirdLinks() {
    const aboutActive = viewport.classList.contains('to-about');
    ['main','abt'].forEach(id => {
      const nav = document.getElementById(id).querySelector('.shore-nav');
      const hidden = (id === 'abt') !== aboutActive;
      nav.inert = hidden;
      nav.setAttribute('aria-hidden', String(hidden));
    });
  }
  new MutationObserver(syncBirdLinks).observe(viewport, {attributes:true, attributeFilter:['class']});
  syncBirdLinks();

  // Metadata pairs each get their own small bubble after an article renders.
  const body = document.getElementById('ov-body');
  function frameNotes() {
    const projects = DATA[overlay.dataset.category] || [];
    body.querySelectorAll('.article-index button').forEach((button, index) => {
      if (button.querySelector('.entry-mini') || !projects[index]) return;
      const label = document.createElement('span');
      label.className = 'entry-caption';
      label.textContent = projects[index].title;
      const thumbnail = document.createElement('img');
      thumbnail.className = 'entry-mini';
      thumbnail.alt = '';
      thumbnail.loading = 'lazy';
      catalogImage(thumbnail, projects[index]);
      button.replaceChildren(thumbnail, label);
    });
    body.querySelectorAll('.article-rail .rail-label').forEach(label => {
      if (label.closest('.blog-note')) return;
      const value = label.nextElementSibling;
      if (!value || !value.classList.contains('rail-value')) return;
      const note = document.createElement('div');
      note.className = 'blog-note';
      label.before(note);
      note.append(label, value);
      if (['Category', 'Entry'].includes(label.textContent.trim())) {
        const link = document.createElement('a');
        link.className = 'rail-link';
        link.href = '#collection';
        link.textContent = value.textContent;
        link.onclick = event => { event.preventDefault(); window.openOverlay(overlay.dataset.category); };
        value.replaceChildren(link);
      }
    });
  }
  new MutationObserver(frameNotes).observe(body, {childList:true, subtree:true});
  frameNotes();
  function addContactSocials() {
    if (!inner.classList.contains('contact-mode') || body.querySelector('.contact-socials')) return;
    const socials = cloud.querySelector('.about-socials').cloneNode(true);
    socials.classList.add('contact-socials');
    body.prepend(socials);
  }
  let arrival;
  new MutationObserver(records => {
    addContactSocials();
    if (!records.some(record => record.target === body) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    arrival?.cancel();
    arrival = body.animate([{opacity:.55,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}], {duration:260,easing:'cubic-bezier(.2,.65,.3,1)'});
  }).observe(body, {childList:true});
  addContactSocials();
})();

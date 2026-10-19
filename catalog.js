const legacyArtGallery = window.renderArtGallery;
// Collection browsing is separate from the existing project detail renderer.
function catalogCover(item) {
  const curated = {
  "regret": "assets/works/thumbnails/regret.png",
  "beyond": "assets/works/thumbnails/beyond.png",
  "fresh": "assets/works/thumbnails/fresh.png",
  "sun": "assets/works/thumbnails/sun.png",
  "eyes": "assets/works/thumbnails/eyes.png",
  "ud": "assets/works/thumbnails/ud.png",
  "wof": "assets/works/thumbnails/wof.png"
};
  if (item.thumbnail || curated[item.id]) return item.thumbnail || curated[item.id];
  const embed = projectVideoEmbed(item.video);
  if (embed.startsWith('https://www.youtube-nocookie.com/embed/')) {
    return 'https://i.ytimg.com/vi/' + embed.split('/').pop() + '/maxresdefault.jpg';
  }
  return item.cover;
}
function catalogImage(image, item) {
  let fallback = false;
  image.onerror = () => {
    if (!fallback && item.cover && image.getAttribute('src') !== item.cover) {
      fallback = true; image.src = item.cover;
    } else {
      image.onerror = null; image.src = phSVG(item.title, item.year || '', 960, 540);
    }
  };
  image.src = catalogCover(item);
}
function renderThumbnailCatalog(cat) {
  const overlay = document.getElementById('overlay');
  overlay.dataset.category = cat;
  const inner = overlay.querySelector('.overlay-inner');
  inner.className = 'overlay-inner catalog-mode';
  const items = cat === 'art' ? ART_IMAGES.map(([file,title,medium,year]) => ({title,year,cover:'assets/works/'+file})) : DATA[cat];
  const selected = Math.min(bookPositions[cat] || 0, items.length - 1);
  const item = items[selected];
  const body = document.getElementById('ov-body');
  body.innerHTML = '<section class="catalog-stage"><nav class="catalog-nav" aria-label="Categories"></nav><div class="catalog-main"><button class="catalog-hero" type="button"><img alt=""><span class="catalog-caption"><small></small><strong></strong><span>Open project ↗</span></span></button><nav class="catalog-thumbnails" aria-label="Choose a project"></nav></div></section>';
  const hero = body.querySelector('.catalog-hero');
  const heroImage = hero.querySelector('img');
  catalogImage(heroImage, item);
  heroImage.alt = item.title;
  hero.querySelector('small').textContent = item.year && !item.year.startsWith('[') ? item.year : '';
  hero.querySelector('strong').textContent = item.title;
  hero.setAttribute('aria-label', 'Open ' + item.title);
  hero.onclick = () => cat === 'art' ? openArtImage(selected) : selectIndexItem(cat, selected);
  const categories = body.querySelector('.catalog-nav');
  ['animation','film','graphic','ui','art'].forEach(key => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = CAT_LABEL[key] || 'Art gallery';
    button.setAttribute('aria-current', key === cat ? 'page' : 'false');
    button.onclick = () => openOverlay(key);
    categories.append(button);
  });
  const thumbnails = body.querySelector('.catalog-thumbnails');
  items.forEach((project, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', 'Preview ' + project.title);
    button.setAttribute('aria-current', String(index === selected));
    const image = document.createElement('img');
    catalogImage(image, project); image.alt = ''; image.loading = 'lazy';
    const label = document.createElement('span'); label.textContent = project.title;
    button.append(image, label);
    button.onclick = () => { bookPositions[cat] = index; renderIndex(cat); };
    thumbnails.append(button);
  });
  const controls = document.createElement('nav');
  controls.className = 'catalog-arrows'; controls.setAttribute('aria-label', 'Browse projects');
  [['Previous project', '←', -1], ['Next project', '→', 1]].forEach(([label, mark, step]) => {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = mark;
    button.setAttribute('aria-label', label); button.disabled = items.length < 2;
    button.onclick = () => {
      bookPositions[cat] = (selected + step + items.length) % items.length;
      renderIndex(cat);
      body.querySelector('[aria-label="' + label + '"]').focus({preventScroll:true});
    };
    controls.append(button);
  });
  body.querySelector('.catalog-stage').append(controls);
  const activeThumb = thumbnails.querySelector('[aria-current="true"]');
  thumbnails.scrollLeft = Math.max(0, activeThumb.offsetLeft - thumbnails.offsetLeft - thumbnails.clientWidth / 2 + activeThumb.clientWidth / 2);
};
window.renderArtGallery = function() {
  document.getElementById('ov-cat').textContent = 'Art gallery';
  legacyArtGallery();
};

const skillIcons = document.querySelector('.software-icons');
[
 ['Photoshop','Ps','photoshop'],
 ['Dragonframe','Df','dragonframe'],
 ['Procreate','✎','procreate']
].forEach(([label,mark,className]) => {
  const icon = document.createElement('div');
  icon.className = 'app-icon ' + className;
  icon.setAttribute('role','img'); icon.setAttribute('aria-label',label); icon.title=label;
  icon.textContent=mark;
  if (className === 'dragonframe' || className === 'procreate') {
    const image = document.createElement('img');
    image.src = 'assets/works/' + className + '-icon.png'; image.alt = '';
    icon.replaceChildren(image);
  }
  skillIcons.append(icon);
});

// Social links supplied by the artist, with the Instagram tracking wrapper removed.
const socials = [
  ['YouTube','https://www.youtube.com/@by9u','<path fill-rule="evenodd" d="M4 4h16a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4zm5 4v8l7-4z"/>'],
  ['Behance','https://www.behance.net/thyanng1','<text x="2" y="17" font-size="15" font-family="Arial" font-weight="bold">Bē</text>'],
  ['LinkedIn','https://www.linkedin.com/in/9uf','<text x="3" y="18" font-size="19" font-family="Arial" font-weight="bold">in</text>'],
  ['Instagram','https://www.instagram.com/9.__.uf/','<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3"/>']
];
const socialNav = document.createElement('nav');
socialNav.className = 'about-socials'; socialNav.setAttribute('aria-label','Find An online');
socials.forEach(([label, url, drawing]) => {
  const link = document.createElement('a');
  link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label',label); link.title = label;
  link.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + drawing + '</svg>';
  socialNav.append(link);
});
document.querySelector('.cloud-content').append(socialNav);
const pondBack = document.querySelector('.overlay-close');
pondBack.textContent = '←';
pondBack.setAttribute('aria-label', 'Back to the pond');
document.getElementById('overlay').prepend(pondBack);

const showreelLink = document.createElement('button');
showreelLink.type = 'button'; showreelLink.className = 'corner-link'; showreelLink.textContent = 'Showreel';
showreelLink.onclick = () => {
  cancelFishing();
  const overlay = document.getElementById('overlay');
  overlay.dataset.category = 'showreel';
  overlay.querySelector('.overlay-inner').className = 'overlay-inner showreel-mode';
  document.getElementById('ov-cat').textContent = 'Showreel';
  document.getElementById('ov-body').innerHTML = '<section class="showreel-space"><span aria-hidden="true">▷</span><p>Showreel coming soon</p></section>';
  overlay.classList.add('open'); overlay.scrollTop = 0;
};
document.querySelector('.corner-nav').prepend(showreelLink);

window.renderIndex = function(cat) { document.getElementById('overlay').dataset.category = cat; return renderTVIndex(cat); };
const education = document.querySelector('.cloud-facts > section:first-child p');
education.innerHTML = '<span class=education-location>Digital Media · Melbourne</span><br>Bachelor of Design, <span class=handwritten-number>2024</span>–present';

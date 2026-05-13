import { fetchPlaceholders } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const ph = await fetchPlaceholders();

  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'video-card-item';
    const cols = [...row.children];

    if (cols[0]) {
      cols[0].className = 'video-card-thumbnail';
      const pic = cols[0].querySelector('picture');
      if (pic) {
        const playBtn = document.createElement('button');
        playBtn.className = 'video-card-play';
        playBtn.setAttribute('type', 'button');
        playBtn.setAttribute('aria-label', ph.playVideo || 'Play video');
        cols[0].append(playBtn);
      }
    }

    if (cols[1]) {
      cols[1].className = 'video-card-body';
    }

    while (row.firstElementChild) li.append(row.firstElementChild);
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}

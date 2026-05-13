import { fetchPlaceholders } from '../../scripts/scripts.js';

function scrollToMilestone(track, index) {
  const items = track.querySelectorAll('.timeline-milestone');
  if (items[index]) {
    items[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

export default async function decorate(block) {
  const ph = await fetchPlaceholders();

  const milestones = [];
  [...block.children].forEach((row) => {
    const cols = [...row.children];
    const year = cols[0]?.textContent.trim();
    const imageDiv = cols[1];
    const contentDiv = cols[2];
    milestones.push({ year, imageDiv, contentDiv });
  });

  block.textContent = '';

  const track = document.createElement('div');
  track.className = 'timeline-track';

  milestones.forEach((m, idx) => {
    const milestone = document.createElement('div');
    milestone.className = 'timeline-milestone';
    milestone.dataset.index = idx;

    const yearEl = document.createElement('div');
    yearEl.className = 'timeline-year';
    yearEl.textContent = m.year;

    const card = document.createElement('div');
    card.className = 'timeline-card';

    if (m.imageDiv) {
      m.imageDiv.className = 'timeline-card-image';
      card.append(m.imageDiv);
    }
    if (m.contentDiv) {
      m.contentDiv.className = 'timeline-card-content';
      card.append(m.contentDiv);
    }

    milestone.append(yearEl, card);
    track.append(milestone);
  });

  const nav = document.createElement('div');
  nav.className = 'timeline-nav';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'timeline-prev';
  prevBtn.setAttribute('type', 'button');
  prevBtn.setAttribute('aria-label', ph.previousMilestone || 'Previous milestone');
  prevBtn.textContent = '‹';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'timeline-next';
  nextBtn.setAttribute('type', 'button');
  nextBtn.setAttribute('aria-label', ph.nextMilestone || 'Next milestone');
  nextBtn.textContent = '›';

  let currentIndex = 0;
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      scrollToMilestone(track, currentIndex);
    }
  });
  nextBtn.addEventListener('click', () => {
    if (currentIndex < milestones.length - 1) {
      currentIndex += 1;
      scrollToMilestone(track, currentIndex);
    }
  });

  nav.append(prevBtn, nextBtn);
  block.append(track, nav);
}

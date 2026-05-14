import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const DESKTOP = window.matchMedia('(min-width: 900px)');

function setAccordionAttrs(h4, isDesktop) {
  if (isDesktop) {
    h4.removeAttribute('role');
    h4.removeAttribute('tabindex');
    h4.removeAttribute('aria-expanded');
  } else {
    h4.setAttribute('role', 'button');
    h4.setAttribute('tabindex', '0');
    if (!h4.hasAttribute('aria-expanded')) h4.setAttribute('aria-expanded', 'false');
  }
}

function buildAccordion(navSection) {
  const h4 = navSection.querySelector('h4');
  if (!h4) return;

  const chevron = document.createElement('span');
  chevron.className = 'footer-nav-chevron';
  chevron.setAttribute('aria-hidden', 'true');
  h4.append(chevron);

  setAccordionAttrs(h4, DESKTOP.matches);

  const toggle = () => {
    if (DESKTOP.matches) return;
    const expanded = navSection.classList.toggle('footer-nav-expanded');
    h4.setAttribute('aria-expanded', String(expanded));
  };

  h4.addEventListener('click', toggle);
  h4.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });

  DESKTOP.addEventListener('change', (e) => {
    setAccordionAttrs(h4, e.matches);
    if (e.matches) navSection.classList.remove('footer-nav-expanded');
  });
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const footer = document.createElement('div');

  // plain HTML order: [0] nav columns, [1] logo+social columns, [2] legal
  const [navSection, socialSection, legalSection] = [...fragment.children];

  if (navSection) {
    navSection.classList.add('footer-nav');
    buildAccordion(navSection);
  }

  if (socialSection) socialSection.classList.add('footer-social-row');

  if (legalSection) legalSection.classList.add('footer-legal');

  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  block.append(footer);
}

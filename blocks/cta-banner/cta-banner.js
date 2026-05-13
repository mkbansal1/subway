export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  const imageRow = rows[0];
  const contentRow = rows[1];

  const pic = imageRow.querySelector('picture');
  if (pic) {
    imageRow.className = 'cta-banner-image';
  }

  contentRow.className = 'cta-banner-content';
}

export default function decorate(block) {
  const rows = [...block.children];
  if (rows[0]) rows[0].classList.add('teaser-image');
  if (rows[1]) rows[1].classList.add('teaser-content');
}

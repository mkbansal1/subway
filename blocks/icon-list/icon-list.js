export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'icon-list-item';
    const cols = [...row.children];
    if (cols[0]) {
      cols[0].className = 'icon-list-icon';
    }
    if (cols[1]) {
      cols[1].className = 'icon-list-text';
    }
    while (row.firstElementChild) li.append(row.firstElementChild);
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}

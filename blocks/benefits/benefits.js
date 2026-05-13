export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'benefits-item';
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      div.className = 'benefits-item-body';
    });
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}

import { LinkedList } from '../../utils/structures/list/LinkedList';
import { Structure } from './Structure';
const list = new LinkedList();
const ul = document.createElement('ul');
const root = document.createElement('div');
const input = document.createElement('input');
input.type = 'text';

const insertLast = document.createElement('button');
insertLast.textContent = 'insertLast';
insertLast.onclick = () => {
  list.insertLast(Number(input.value));
  renderUl();
  input.value = '';
};

const deleteLast = document.createElement('button');
deleteLast.textContent = 'deleteLast';
deleteLast.onclick = () => {
  list.deleteLast();
  renderUl();
};

const insertFirst = document.createElement('button');
insertFirst.textContent = 'insertFirst';
insertFirst.onclick = () => {
  list.insertFirst(input.value);
  input.value = '';
  renderUl();
};

const deleteFirst = document.createElement('button');
deleteFirst.textContent = 'deleteFirst';
deleteFirst.onclick = () => {
  list.deleteFirst();
  input.value = '';
  renderUl();
};

export function renderHM3() {
  root.appendChild(input);
  root.appendChild(insertLast);
  root.appendChild(insertFirst);
  root.appendChild(deleteLast);
  root.appendChild(deleteFirst);
  root.appendChild(ul);

  const jackBlack = new Structure([
    ['name', 'utf16', 10],
    ['lastName', 'utf16', 10],
    ['age', 'u16'] 
  ]);
  
  jackBlack.set('name', 'John');
  jackBlack.set('lastName', 'Black');
  jackBlack.set('age', 53);
  
  console.log(jackBlack.get('name'));
  console.log(jackBlack.get('lastName'));
  console.log(jackBlack.get('age'));
  
  return root;
}

function renderUl() {
  ul.innerHTML = '';
  let node = list.first;
  while (node) {
    const li = document.createElement('li');
    li.textContent = `${node.value}`;
    ul.appendChild(li);
    node = node.next;
  }

  const first = document.createElement('li');
  first.textContent = `first: ${list.first?.value}`;
  ul.appendChild(first);
  const last = document.createElement('li');
  last.textContent = `last: ${list.last?.value}`;
  ul.appendChild(last);
}

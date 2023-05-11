import { SimpleDequeue, SimpleQueue } from 'utils/structures/queue';
import { TypedArrayStack } from 'utils/structures/stack';

export function renderHM4() {
  const root = document.createElement('div');

  renderQueue(root);
  renderDequeue(root);
  renderStack(root);

  return root;
}

function renderQueue(root: HTMLDivElement) {
  const title = document.createElement('h5');
  title.textContent = 'Queue';

  const input = document.createElement('input');
  input.type = 'text';

  const queue = new SimpleQueue();

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Add element';
  addBtn.onclick = () => {
    queue.push(input.value);
    input.value = '';
    renderP();
  };

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove element';
  removeBtn.onclick = () => {
    queue.pop();
    renderP();
  };

  const p = document.createElement('p');

  function renderP() {
    const items = [];
    for (const el of queue) {
      items.push(el);
    }
    p.innerHTML = items.join('->');
  }

  root.appendChild(title);
  root.appendChild(input);
  root.appendChild(addBtn);
  root.appendChild(removeBtn);
  root.appendChild(p);
}

function renderDequeue(root: HTMLDivElement) {
  const title = document.createElement('h5');
  title.textContent = 'Dequeue';

  const input = document.createElement('input');
  input.type = 'text';

  const queue = new SimpleDequeue();

  const addToStart = document.createElement('button');
  addToStart.textContent = 'Add to start';
  addToStart.onclick = () => {
    queue.push(input.value);
    input.value = '';
    renderP();
  };

  const addToEnd = document.createElement('button');
  addToEnd.textContent = 'Add to end';
  addToEnd.onclick = () => {
    queue.unshift(input.value);
    input.value = '';
    renderP();
  };

  const removeFromStart = document.createElement('button');
  removeFromStart.textContent = 'Remove from start';
  removeFromStart.onclick = () => {
    queue.shift();
    renderP();
  };

  const removeFromEnd = document.createElement('button');
  removeFromEnd.textContent = 'Remove from end';
  removeFromEnd.onclick = () => {
    queue.pop();
    renderP();
  };

  const p = document.createElement('p');

  function renderP() {
    const items = [];
    for (const el of queue) {
      items.push(el);
    }
    p.innerHTML = items.join('<->');
  }

  root.appendChild(title);
  root.appendChild(input);
  root.appendChild(addToStart);
  root.appendChild(addToEnd);
  root.appendChild(removeFromStart);
  root.appendChild(removeFromEnd);
  root.appendChild(p);
}

function renderStack(root: HTMLDivElement) {
  const title = document.createElement('h5');
  title.textContent = 'Stack';

  const input = document.createElement('input');
  input.type = 'text';

  const stack = new TypedArrayStack(Int32Array, 10);

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Add';
  addBtn.onclick = () => {
    stack.push(Number(input.value));
    input.value = '';
    renderP();
  };

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.onclick = () => {
    stack.pop();
    stack.displayStack()
    renderP();
  };

  const p = document.createElement('p');

  function renderP() {
    const items = [];
    for (const el of stack) {
      items.push('| ' + el + ' |');
    }
    p.innerHTML = items.join('<br />');
  }

  root.appendChild(title);
  root.appendChild(input);
  root.appendChild(addBtn);
  root.appendChild(removeBtn);
  root.appendChild(p);
}

const h1 = document.createElement('h1');
h1.textContent = 'Hello World';

document.body.appendChild(h1);

const button = document.createElement('button');
button.onclick = () => {
  h1.textContent += '11';
};
button.innerText = 'add 1'

document.body.appendChild(button);

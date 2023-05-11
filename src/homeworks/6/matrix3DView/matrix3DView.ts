import { Matrix3D } from 'utils/structures/matrix/Matrix3D';
import './matrix3D.css';
import html from './matrix.html';

export function render3DView(root: HTMLDivElement) {
  const view = document.createElement('div');
  view.innerHTML = html;
  root.appendChild(view);


  const cube = document.querySelector('.cube');
  const radioGroup = document.querySelector('.radio-group');
  let currentClass = '';

  if (!radioGroup) {
    return;
  }

  function changeSide() {
    if (!cube || !radioGroup) {
      return;
    }
    const checkedRadio = radioGroup.querySelector(
      ':checked',
    ) as HTMLInputElement;
    const showClass = 'show-' + checkedRadio.value;
    if (currentClass) {
      cube.classList.remove(currentClass);
    }
    cube.classList.add(showClass);
    currentClass = showClass;
  }

  changeSide();

  radioGroup.addEventListener('change', changeSide);

  let x = 0,
    y = 0,
    z = 0;

  const rotateXBtn = document.createElement('button');
  rotateXBtn.innerText = 'Rotate X';
  rotateXBtn.onclick = () => {
    view.style.transform = `rotateX(${(x += 90)}deg)`;
  };

  const rotateYBtn = document.createElement('button');
  rotateYBtn.innerText = 'Rotate Y';
  rotateYBtn.onclick = () => {
    view.style.transform = `rotateY(${(y += 90)}deg)`;
  };

  const rotateZBtn = document.createElement('button');
  rotateZBtn.innerText = 'Rotate Z';
  rotateZBtn.onclick = () => {
    view.style.transform = `rotateZ(${(z += 90)}deg)`;
  };

  const matrix3D = new Matrix3D(3, 3, 3);

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        matrix3D.set(x, y, z, Math.round(Math.random() * 100));
      }
    }
  }

  const front = document.createElement('div');
  front.style.display = 'grid';
  front.style.gridTemplateColumns = 'repeat(3, 1fr)';
  front.style.gridTemplateRows = 'repeat(3, 1fr)';
  front.style.gap = '10px';
  front.style.border = '1px solid red';

  for (let c = 0; c < 3; c++) {
    for (let r = 0; r < 3; r++) {
      const cell = document.createElement('div');
      cell.textContent = String(matrix3D.get(c, r, 0));
      front.appendChild(cell);
    }
  }

  view.appendChild(front);

  const back = document.createElement('div');
  back.style.display = 'grid';
  back.style.gridTemplateColumns = 'repeat(3, 1fr)';
  back.style.gridTemplateRows = 'repeat(3, 1fr)';
  back.style.gap = '10px';

  for (let c = 0; c < 3; c++) {
    for (let r = 0; r < 3; r++) {
      const cell = document.createElement('div');
      cell.style.background = 'grey';
      cell.style.border = '1px solid black';
      cell.style.borderRadius = '50%';
      cell.style.padding = '10px';
      cell.textContent = String(matrix3D.get(c, r, 2));
      back.appendChild(cell);
    }
  }

  const left = document.createElement('div');
  left.style.display = 'grid';
  left.style.gridTemplateColumns = 'repeat(3, 1fr)';
  left.style.gridTemplateRows = 'repeat(3, 1fr)';
  left.style.gap = '10px';

  const right = document.createElement('div');
  right.style.display = 'grid';
  right.style.gridTemplateColumns = 'repeat(3, 1fr)';
  right.style.gridTemplateRows = 'repeat(3, 1fr)';
  right.style.gap = '10px';

  const top = document.createElement('div');
  top.style.display = 'grid';
  top.style.gridTemplateColumns = 'repeat(3, 1fr)';
  top.style.gridTemplateRows = 'repeat(3, 1fr)';
  top.style.gap = '10px';

  const bottom = document.createElement('div');
  bottom.style.display = 'grid';
  bottom.style.gridTemplateColumns = 'repeat(3, 1fr)';
  bottom.style.gridTemplateRows = 'repeat(3, 1fr)';
  bottom.style.gap = '10px';

  root.appendChild(rotateXBtn);
  root.appendChild(rotateYBtn);
  root.appendChild(rotateZBtn);
}

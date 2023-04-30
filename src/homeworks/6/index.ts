import { Vector } from 'utils/structures/array/Vector';
import { Matrix3D } from 'utils/structures/matrix/Matrix3D';

export function renderHM6() {
  const root = document.createElement('div');

  renderVector(root);
  renderMatrix3D(root);

  return root;
}

function renderVector(root: HTMLDivElement) {
  const title = document.createElement('h5');
  title.textContent = 'Vector';

  const input = document.createElement('input');
  input.type = 'text';

  const vector = new Vector(Uint8Array, { capacity: 3 });

  const pushBtn = document.createElement('button');
  pushBtn.textContent = 'Push';
  pushBtn.onclick = () => {
    vector.push(Number(input.value));
    input.value = '';
    renderP();
  };

  const p = document.createElement('p');

  function renderP() {
    const res = [];

    for (const el of vector) {
      res.push(el);
    }
    p.innerHTML = res.join('-');
  }

  root.appendChild(title);
  root.appendChild(input);
  root.appendChild(pushBtn);
  root.appendChild(p);
}

function renderMatrix3D(root: HTMLDivElement) {
  const title = document.createElement('h5');
  title.textContent = 'Matrix3D';

  const labelX = document.createElement('p');
  labelX.innerHTML = 'X = ';
  const inputX = document.createElement('input');
  inputX.type = 'text';
  labelX.appendChild(inputX);
  const labelY = document.createElement('p');
  labelY.innerHTML = 'Y = ';
  const inputY = document.createElement('input');
  inputY.type = 'text';
  labelY.appendChild(inputY);
  const labelZ = document.createElement('p');
  labelZ.innerHTML = 'Z = ';
  const inputZ = document.createElement('input');
  inputZ.type = 'text';
  labelZ.appendChild(inputZ);
  const labelValue = document.createElement('p');
  labelValue.innerHTML = 'Value = ';
  const inputValue = document.createElement('input');
  inputValue.type = 'text';
  labelValue.appendChild(inputValue);

  const setBtn = document.createElement('button');
  setBtn.innerText = 'Set';

  const matrix = new Matrix3D(3, 3, 3);

  setBtn.onclick = () => {
    matrix.set(
      Number(inputX.value),
      Number(inputY.value),
      Number(inputZ.value),
      Number(inputValue.value),
    );
    renderP();
  };

  const p = document.createElement('p');

  function renderP() {
    p.innerHTML = matrix.toString().replaceAll('\n', '<br />');
  }

  root.appendChild(title);
  root.appendChild(labelX);
  root.appendChild(labelY);
  root.appendChild(labelZ);
  root.appendChild(labelValue);
  root.appendChild(setBtn);
  root.appendChild(p);
}

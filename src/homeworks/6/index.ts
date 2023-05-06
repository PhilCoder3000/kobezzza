import { Vector } from 'utils/structures/array/Vector';
import { SimpleHashMap } from 'utils/structures/hashMap/SimpleHashMap';
import { Matrix3D } from 'utils/structures/matrix/Matrix3D';
import { render3DView } from './matrix3DView/matrix3DView';

export function renderHM6() {
  const root = document.createElement('div');

  renderVector(root);
  renderMatrix3D(root);

  const map = new SimpleHashMap(120);

  map.set('foo', 1);
  map.set(42, 10);
  map.set(document, 100);

  // console.log(map.get(42)); // 10
  // console.log(map.has(document)); // true
  // console.log(map.delete(document)); // 100
  // console.log(map.has(document)); // false

  render3DView(root);

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
  setBtn.disabled = true;

  setBtn.onclick = () => {
    if (matrix) {
      matrix.set(
        Number(inputX.value),
        Number(inputY.value),
        Number(inputZ.value),
        Number(inputValue.value),
      );
      renderP();
    }
  };

  const createMatrixBtn = document.createElement('button');
  createMatrixBtn.textContent = 'Create matrix';

  let matrix: Nullable<Matrix3D> = null;

  createMatrixBtn.onclick = () => {
    matrix = new Matrix3D(
      Number(inputX.value),
      Number(inputY.value),
      Number(inputZ.value),
    );
    setBtn.disabled = false;
    root.removeChild(createMatrixBtn);
    root.appendChild(setBtn);
  };

  const p = document.createElement('p');

  function renderP() {
    if (matrix) {
      p.innerHTML = matrix.toString().replaceAll('\n', '<br />');
    }
  }

  root.appendChild(title);
  root.appendChild(labelX);
  root.appendChild(labelY);
  root.appendChild(labelZ);
  root.appendChild(labelValue);
  root.appendChild(createMatrixBtn);
  root.appendChild(p);
}


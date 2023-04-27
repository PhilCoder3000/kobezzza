import { Matrix3D } from 'utils/structures/matrix/Matrix3D';

type Obj = {
  x: number;
  y: number;
  z: number;
};

export class Matrix3DHM {
  #matrix: Matrix3D;
  constructor({ x, y, z }: Obj) {
    this.#matrix = new Matrix3D(x, y, z);
  }

  set({ x, y, z }: Obj, value: number) {
    this.#matrix.set(x, y, z, value);
  }

  get({ x, y, z }: Obj) {
    return this.#matrix.get(x, y, z);
  }
}

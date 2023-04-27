export class Matrix3D {
  #data: ArrayBuffer;
  #view: DataView;

  #rows: number;
  #columns: number;
  #depth: number;

  constructor(columns: number, rows: number, depth: number) {
    this.#rows = rows;
    this.#columns = columns;
    this.#depth = depth;
    const length = rows * columns * depth;
    this.#data = new ArrayBuffer(length);
    this.#view = new DataView(this.#data);
  }

  set(column: number, row: number, depth: number, value: number) {
    this.#isValidOperation(column, row, depth);

    const byteOffset = this.#getByteOffset(column, row, depth);
    this.#view.setUint8(byteOffset, value);
  }

  get(column: number, row: number, depth: number) {
    this.#isValidOperation(column, row, depth);

    const byteOffset = this.#getByteOffset(column, row, depth);
    return this.#view.getUint8(byteOffset);
  }

  #getByteOffset(column: number, row: number, depth: number) {
    return depth * this.#columns * this.#rows + column * this.#columns + row;
  }

  #isValidOperation(column: number, row: number, depth: number) {
    if (column < 0 || column > this.#columns) {
      throw new Error('Column index out of bounds');
    }
    if (row < 0 || row > this.#rows) {
      throw new Error('Row index out of bounds');
    }
    if (depth < 0 || depth > this.#rows) {
      throw new Error('Depth index out of bounds');
    }
  }

  display() {
    let rowStr = '';
    for (let depth = 0; depth < this.#depth; depth++) {
      rowStr += 'Depth:' + depth + '\n';
      for (let row = 0; row < this.#rows; row++) {
        rowStr += '|';
        for (let col = 0; col < this.#columns; col++) {
          const byteOffset = this.#getByteOffset(col, row, depth);
          const el = this.#view.getUint8(byteOffset);
          rowStr += el + '|';
        }
        rowStr += '\n';
      }
    }
    console.log(rowStr);
  }
}

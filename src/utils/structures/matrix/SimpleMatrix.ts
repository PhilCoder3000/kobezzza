export class SimpleMatrix {
  #data: ArrayBuffer;
  #view: DataView;
  #columns: number;
  #rows: number;

  constructor(columns: number, rows: number, ) {
    const length = rows * columns;
    this.#columns = columns;
    this.#rows = rows;
    this.#data = new ArrayBuffer(length);
    this.#view = new DataView(this.#data);
  }

  get(column: number, row: number): number {
    this.#isValidOperation(column, row);

    const byteOffset = this.#getByteOffset(column, row)
    return this.#view.getUint8(byteOffset);
  }

  set(column: number, row: number, value: number) {
    this.#isValidOperation(column, row);

    const byteOffset = this.#getByteOffset(column, row)
    this.#view.setUint8(byteOffset, value);
  }

  #getByteOffset(column: number, row: number) {
    return  column * this.#columns + row;
  }

  #isValidOperation(column: number, row: number) {
    if (column < 0 || column >= this.#columns) {
      throw new Error(`Column index: ${column} out of bounds`);
    }
    if (row < 0 || row >= this.#rows) {
      throw new Error(`Row index: ${row} out of bounds`);
    }
  }

  display() {
    let rowStr = '';
    for (let row = 0; row < this.#rows; row++) {
      rowStr += '|';
      for (let col = 0; col < this.#columns; col++) {
        rowStr += this.get(col, row) + '|';
      }
      rowStr += '\n';
    }
    console.log(rowStr);
  }
}

export class SimpleArray {
  #data: TypedArray;
  length: number = 0;

  constructor(Arr: TypedArrayConstructor, length: number) {
    this.#data = new Arr(length);
  }

  set(index: number, value: number): void {
    this.#data[index] = value;
  }

  get(index: number): number {
    return this.#data[index];
  }

  find(searchValue: number): number {
    for (let i = 0; i < this.#data.length; i++) {
      if (this.#data[i] === searchValue) {
        return i;
      }
    }
    return -1;
  }
}

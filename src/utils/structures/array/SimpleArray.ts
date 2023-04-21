type ArrayValue = number;

class SimpleArray implements BaseArray {
  #array: Uint8Array;

  constructor(length: number) {
    this.#array = new Uint8Array(new ArrayBuffer(length));
  }

  set(index: number, value: ArrayValue): void {
    this.#array[index] = value;
  }

  get(index: number): ArrayValue {
    return this.#array[index];
  }

  find(searchValue: ArrayValue): number {
    for (let i = 0; i < this.#array.length; i++) {
      if (this.#array[i] === searchValue) {
        return i
      }
    }
    return -1
  }
}

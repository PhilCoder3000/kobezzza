class HighArray {
  #data: Uint8Array;
  #length: number;

  constructor(length: number) {
    this.#data = new Uint8Array(length)
    this.#length = length;
  }

  find(value: number) {
    let j;
    for (j = 0; j < this.#data.length; j++) {
      if (this.#data[j] === value) {
        break;
      }
    }
    if (j === this.#length) {
      return -1;
    } else {
      return this.#data[j]
    }
  }
}

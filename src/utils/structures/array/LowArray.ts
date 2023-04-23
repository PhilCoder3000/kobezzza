class LowArray {
  #data: Uint8Array

  constructor(length: number) {
    this.#data = new Uint8Array(length)
  }

  set(index: number, value: number) {
    if (index < this.#data.length) {
      this.#data[index] = value;
      return value;
    } else {
      throw new Error('Index must be less array length')
    }
  }

  get(index: number) {
    if (index < this.#data.length) {
      return this.#data[index]
    } else {
      throw new Error('Index must be less array length')
    }
  }
}
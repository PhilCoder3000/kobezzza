export class SimpleBit {
  #array: Uint8Array;

  constructor(array: Uint8Array) {
    this.#array = array;
  }
  get(arrayIndex: number, bitIndex: number): 0 | 1 {
    this.#isValidOperation(arrayIndex, bitIndex);

    const uint8 = this.#array[arrayIndex];
    return (uint8 & (0b1 << bitIndex)) === 0 ? 0 : 1;
  }

  set(arrayIndex: number, bitIndex: number, newValue: 0 | 1): void {
    this.#isValidOperation(arrayIndex, bitIndex);

    if (newValue === 1) {
      this.#array[arrayIndex] |= 0b1 << bitIndex;
    } else {
      this.#array[arrayIndex] &= ~(0b1 << bitIndex);
    }
  }

  #isValidOperation(arrayIndex: number, bitIndex: number) {
    if (arrayIndex > this.#array.length) {
      throw new Error('Arg 1 must be array index');
    }
    if (bitIndex > 0b111) {
      throw new Error('Arg 2 must be less then or equal 7 or 0b111');
    }
    if (bitIndex < 0b0) {
      throw new Error('Arg 2 must be more than or equal to 0');
    }
  }

  getByte(arrayIndex: number) {
    return this.#array[arrayIndex]
  } 
}

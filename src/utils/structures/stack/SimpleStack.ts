import { SimpleArray } from '../array/SimpleArray';

export class SimpleStack {
  #data: SimpleArray
  cursor = -1;
  maxLength: number;

  constructor(length: number) {
    this.#data = new SimpleArray(Uint8Array, length)
    this.maxLength = length;
  }

  push(value: number) {
    if (this.cursor < this.maxLength) {
      this.#data.set(++this.cursor, value)
    } else {
      throw new Error('Stack overflow');
    }
  }

  pop() {
    if (this.cursor >= 0) {
      return this.#data.get(this.cursor--);
    } else {
      throw new Error('Stack is empty');
    }
  }

  peek() {
    if (this.cursor >= 0) {
      return this.#data.get(this.cursor);
    } else {
      throw new Error('Stack is empty');
    }
  }

  isEmpty() {
    return this.cursor === -1
  }

  isFull() {
    return this.cursor === this.maxLength -1
  }
}

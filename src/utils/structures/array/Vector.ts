import { SimpleArray } from './SimpleArray';

type Options = {
  capacity: number;
};

export class Vector {
  #data: SimpleArray;
  #length: number;
  #cursor: number = 0;

  constructor(protected Arr: TypedArrayConstructor, { capacity }: Options) {
    this.#data = new SimpleArray(Arr, capacity);
    this.#length = capacity;
  }

  push(...values: number[]) {
    for (let i = 0; i < values.length; i++) {
      if (this.#cursor === this.#length - 1) {
        this.#grow();
      }
      this.#data.set(this.#cursor++, values[i]);
    }
  }

  pop() {
    return this.#data.get(this.#cursor--);
  }

  shift() {
    const result = this.#data.get(0);
    this.#cursor--;
    for (let i = 1; i < this.#cursor; i++) {
      this.#data.set(i - 1, this.#data.get(i));
    }
    return result;
  }

  unshift(value: number) {
    this.#cursor++;
    for (let i = 0; i < this.#cursor; i++) {
      this.#data.set(i + 1, this.#data.get(i));
    }
    this.#data.set(0, value);
  }

  set(index: number, value: number) {
    if (this.#cursor === this.#length - 1) {
      this.#grow();
    }
    this.#data.set(index, value);
  }

  
  get(index: number) {
    return this.#data.get(index)
  }
  

  public get length(): number {
    return this.#cursor;
  }

  #grow() {
    const newLength = Math.round(this.#length * 2.3);
    this.#length = newLength;
    const newArr = new SimpleArray(this.Arr, newLength);
    this.#data = this.#copy(this.#data, newArr, this.#cursor);
  }

  #copy(from: SimpleArray, to: SimpleArray, elCount: number) {
    for (let i = 0; i < elCount; i++) {
      to.set(i, from.get(i));
    }
    return to;
  }

  *[Symbol.iterator]() {
    let cursor = 0;

    while(cursor <= this.#length) {
      yield this.#data.get(cursor++)
    }
  }
}

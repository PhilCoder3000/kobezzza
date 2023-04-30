export class TypedArrayStack {
  array;
  cursor = -1;
  maxLength;

  constructor(Array: TypedArrayConstructor, length: number) {
    this.array = new Array(length);
    this.maxLength = length;
  }

  push(value: number) {
    if (this.cursor < this.maxLength) {
      this.array[++this.cursor] = value;
    } else {
      throw new Error('Stack overflow');
    }
  }

  pop() {
    if (this.cursor >= 0) {
      return this.array[this.cursor--];
    } else {
      throw new Error('Stack is empty');
    }
  }

  get head(): number {
    return this.array[this.cursor];
  }

  displayStack() {
    let strQueue = '';
    for (let i = this.cursor; i >= 0; i--) {
      strQueue += '|' + this.array[i] + '|\n';
    }
    console.log(strQueue);
  }

  *[Symbol.iterator]() {
    let cursor = this.cursor;

    while (cursor >= 0) {
      yield this.array[cursor--]
    }
  }
}

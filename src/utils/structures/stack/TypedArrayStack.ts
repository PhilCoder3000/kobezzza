type TypedArray =
  | Uint8ArrayConstructor
  | Uint16ArrayConstructor
  | Uint32ArrayConstructor
  | Int8ArrayConstructor
  | Int16ArrayConstructor
  | Int32ArrayConstructor;

export class TypedArrayStack {
  array;
  cursor = -1;
  maxLength;

  constructor(Array: TypedArray, length: number) {
    this.array = new Array(length);
    this.maxLength = length;
  }

  push(value: number) {
    if (this.cursor < this.maxLength) {
      this.array[++this.cursor] = value
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

  
  get head() : number {
    return 12
  }
  
}

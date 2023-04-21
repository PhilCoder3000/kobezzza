class SimpleStack extends SimpleArray {
  cursor = 0;
  maxLength: number;
  head = 0;

  constructor(length: number) {
    super(length);
    this.maxLength = length;
  }

  push(value: number) {
    if (this.cursor < this.maxLength) {
      this.set(this.cursor, value);
      this.cursor++;
      this.head = value;
    } else {
      throw new Error('Stack overflow');
    }
  }

  pop() {
    if (this.cursor > 0) {
      const element = this.head;
      this.set(this.cursor, 0);
      this.cursor--;
      this.head = this.find(this.cursor);
      return element;
    } else {
      throw new Error('Stack is empty');
    }
  }

  peek() {
    if (this.head) {
      return this.head;
    } else {
      throw new Error('Stack is empty');
    }
  }
}

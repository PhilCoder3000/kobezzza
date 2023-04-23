class SimpleArray implements BaseArray {
  data: Uint8Array;

  constructor(length: number) {
    this.data = new Uint8Array(new ArrayBuffer(length));
  }

  set(index: number, value: number): void {
    this.data[index] = value;
  }

  get(index: number): number {
    return this.data[index];
  }

  find(searchValue: number): number {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] === searchValue) {
        return i;
      }
    }
    return -1;
  }
}

export class PriorityQueue {
  #data: DataView;
  length: number = 0;

  constructor(length: number) {
    this.#data = new DataView(new ArrayBuffer(length));
  }

  push(value: number) {
    if (this.length === 0) {
      this.#data.setUint8(this.length++, value);
    } else {
      this.length++;
      let moved = null;

      for (let i = 0; i < this.length; i++) {
        const el = this.#data.getUint8(i);
        if (moved != null) {
          this.#data.setUint8(i, moved);
          moved = el;
        } else if (el > value) {
          moved = el;
          this.#data.setUint8(i, value);
        }
      }

      if (moved == null) {
        this.#data.setUint8(this.length - 1, value)
      }
    }
  }

  pop() {
    return this.#data.getUint8(--this.length);
  }

  display() {
    let dataStr = '';
    for (let i = 0; i < this.length; i++) {
      dataStr += this.#data.getUint8(i) + '>';
    }
    console.log(dataStr.slice(0, -1));
  }
}

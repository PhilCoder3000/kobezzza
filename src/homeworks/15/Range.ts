type AvailableValue = string | number;

export class Range {
  array: AvailableValue[] = [];
  constructor(from: AvailableValue, to: AvailableValue) {
    if (typeof from === 'string' && typeof to === 'string') {
      const fromPoint = from.codePointAt(0),
        toPoint = to.codePointAt(0);
      if (!fromPoint || !toPoint) {
        throw new Error();
      }
      let min = Math.min(fromPoint, toPoint),
        max = Math.max(fromPoint, toPoint);
      while (min <= max) {
        this.array.push(String.fromCodePoint(min++));
      }
    }
    if (typeof from === 'number' && typeof to === 'number') {
      let min = Math.min(from, to),
        max = Math.max(from, to);
      while (min <= max) {
        this.array.push(min++);
      }
    }
  }

  reverse() {
    return this.array.reverse()
  }

  [Symbol.iterator]() {
    let cursor = 0;
    return {
      [Symbol.iterator]() {
        return this
      },
      next: () => {
        if (cursor >= this.array.length) {
          return {
            value: undefined,
            done: true,
          }
        }
        return {
          value: this.array[cursor++],
          done: false,
        }
      }
    }
  }
}


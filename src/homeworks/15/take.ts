export function take(iter: Iterator<number>,n: number) {
  let i = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      return {
        value: iter.next().value,
        done: i++ >= n,
      }
    }
  }
}
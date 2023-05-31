export function random(start: number, end: number): IterableIterator<number> {
  let i = start - 1;
  return {
    [Symbol.iterator]()  {
      return this;
    },
    next: () => {
      return {
        value: Math.ceil(Math.random() * 1000),
        done: i++ >= end
      }
    }
  }
}
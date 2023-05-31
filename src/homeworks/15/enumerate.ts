export function enumerate(
  iter: Iterator<number>,
): IterableIterator<[number, number]> {
  let i = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let cursor = iter.next();
      return {
        value: [i++, cursor.value],
        done: cursor.done,
      };
    },
  };
}

export function filter(
  iter: Iterator<number>,
  predicate: (value: number) => boolean,
): IterableIterator<number> {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      let result = iter.next();
      
      while (!result.done) {
        if (predicate(result.value)) {
          return { value: result.value, done: false };
        }
        
        result = iter.next();
      }
      return {
        value: undefined,
        done: true,
      };
    },
  };
}

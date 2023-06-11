export function filter(
  iter: Iterable<number>,
  predicate: (value: number) => boolean,
): IterableIterator<number> {
  const innerIter = iter[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      let result = innerIter.next();
      
      while (!result.done) {
        if (predicate(result.value)) {
          return result;
        }
        
        result = innerIter.next();
      }
      return {
        value: undefined,
        done: true,
      };
    },
  };
}

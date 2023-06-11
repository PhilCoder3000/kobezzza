export function mapSeq(iterable: Iterable<any>, functions: Iterable<Function>) {
  const iter = iterable[Symbol.iterator]()
  return {
    [Symbol.iterator]() {
      return this;
    },

    next: () => {
      const value = iter.next()
      if (value.done) {
        return value;
      }
      let result = value.value;

      for (const func of functions) {
        result = func(result)
      }

      return {
        value: result,
        done: false,
      }
    }
  }
}
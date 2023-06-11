export function seq<T>(...iters: Iterable<T>[]) {
  let cursor = 0;
  const arrIter = iters.map(i => i[Symbol.iterator]())

  return {
    [Symbol.iterator]() {
      return this
    },
    next: () => {
      try {
        while (true) {
          let value = arrIter[cursor].next()         
          if (value.done) {
            cursor++;
          } else {
            return value
          }
        }
      } catch (error) {
        return {
          value: undefined,
          done: true,
        }
      }
    }
  }
}
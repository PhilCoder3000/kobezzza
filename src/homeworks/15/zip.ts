export function zip<T>(...iterables: Iterable<T>[]) {
  const iters = iterables.map((i) => i[Symbol.iterator]())
  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      try {
        let tuple: any[] = [];
        iters.forEach((i) => {
          const value = i.next();
          if (value.done) {
            throw new Error()
          }
          tuple.push(value.value)
        })
        return {
          value: tuple,
          done: false,
        }
      } catch (error) {
        return {
          value: undefined,
          done: true
        }
      }
    }
  }
}
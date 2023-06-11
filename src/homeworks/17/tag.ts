export function tag(str: string) {
  return function*(iterable: Iterable<string>) {
    return {
      value: {
        type: 'TAG',
        value: 'function'
      },
      done: true,
    }
  }
}
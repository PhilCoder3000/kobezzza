export function* filter(iter: Iterable<Object>, fn: Function) {
  for (const el of iter) {
    if (fn(el)) {
      yield el
    }
  }
}
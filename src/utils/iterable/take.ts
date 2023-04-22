export function* take(iter: Iterable<Object>, n: number) {
  for (const el of iter) {
    if (n > 0) {
      yield el
      n--;
    } else {
      return;
    }
  }
}
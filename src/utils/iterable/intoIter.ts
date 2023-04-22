export function* ontoIter(obj: IterableIterator<Object>) {
  if (obj == null) {
    return;
  }

  if (obj[Symbol.iterator] != null) {
    yield* obj[Symbol.iterator]();
    return;
  }

  if (typeof obj === 'object') {
    for (const key in obj) {
      yield obj[key as keyof typeof obj];
    }

    return;
  }

  yield obj;
}
export function* intoIter(obj: Object | IterableIterator<Object>) {
  if (obj == null) {
    return;
  }

  if (Symbol.iterator in obj && obj[Symbol.iterator] != null) {
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

function foo(data: number[]) {
  const iter = intoIter(data);

  for (const el of iter) {
    console.log(el);
  }
}

foo([1, 2, 3]);

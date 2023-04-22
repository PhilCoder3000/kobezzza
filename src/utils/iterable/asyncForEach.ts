export type Gen = Generator<undefined, void, unknown>;

export function* forEach(iter: Array<number>, fn: Function): Gen {
  let time = Date.now();

  for (const el of iter) {
    fn(el);

    if (Date.now() - time > 300) {
      yield;
      time = Date.now()
    }
  }
}

export function executor(
  iter: Gen,
  value?: unknown,
): Promise<Response | unknown[] | void> {
  const res = iter.next(value);
  const promise = Promise.resolve(res.value);

  if (res.done) {
    return promise;
  }

  return promise.then(
    (val) => executor(iter, val),
    (err) => {
      const res = iter.throw(err);

      if (res.done) {
        return res.value;
      }

      return executor(iter, res.value);
    },
  );
}

executor(forEach(new Array(1e30), console.log));
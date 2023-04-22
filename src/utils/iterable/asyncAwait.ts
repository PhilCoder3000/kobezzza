export type Gen = Generator<Promise<Response>, unknown[], unknown>;

export function* fetchSomething(): Gen {
  try {
    const a = yield fetch('url1');
    const b = yield fetch('url2');

    return [a, b];
  } catch (error) {
    throw new Error('fetch something error');
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

executor(fetchSomething());

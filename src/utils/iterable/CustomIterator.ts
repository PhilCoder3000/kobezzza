export class CustomIterator {
  iter: Iterable<Object>;

  constructor(iter: Iterable<Object>) {
    this.iter = iter;
  }

  *[Symbol.iterator]() {
    yield* this.iter;
  }

  filter(fn: Function) {
    const { iter } = this;

    return new CustomIterator(
      (function* () {
        for (const el of iter) {
          if (fn(el)) {
            yield el;
          }
        }
      })(),
    );
  }

  map(fn: Function) {
    const { iter } = this;

    return new CustomIterator(
      (function* () {
        for (const el of iter) {
          yield fn(el);
        }
      })(),
    );
  }

  take(n: number) {
    const { iter } = this;

    return new CustomIterator(
      (function* () {
        for (const el of iter) {
          if (n > 0) {
            yield el;
            n--;
          } else {
            return;
          }
        }
      })(),
    );
  }

  enumerate() {
    const { iter } = this;

    return new CustomIterator(
      (function* () {
        let i = 0;

        for (const el of iter) {
          yield [el, i];
          i++;
        }
      })(),
    );
  }
}

const iter = new CustomIterator([1, 2, 3]);

iter
  .filter((el: number) => el > 2)
  .map((el: number) => el + 2)
  .take(5)
  .enumerate();

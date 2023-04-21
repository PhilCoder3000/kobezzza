export class CustomIteratorTree {
  value: number;
  left: Nullable<CustomIteratorTree>;
  right: Nullable<CustomIteratorTree>;

  constructor(
    value: number,
    left: Nullable<CustomIteratorTree> = null,
    right: Nullable<CustomIteratorTree> = null,
  ) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  [Symbol.iterator]() {
    let state = 0;
    let cursor: Iterator<CustomIteratorTree>;

    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => {
        if (state === 0) {
          state++;
          return {
            value: this.value,
            done: false,
          };
        }
        if (state === 1) {
          if (this.left === null) {
            state++;
          } else {
            cursor = cursor || this.left?.[Symbol.iterator]();

            const res = cursor.next();

            if (res.done) {
              //@ts-ignore
              cursor = undefined;
              state++;
            } else {
              return res;
            }
          }
        }
        if (state === 2) {
          if (this.right === null) {
            state++;
          } else {
            cursor = cursor || this.right?.[Symbol.iterator]();

            return cursor.next();
          }
        }

        return {
          value: undefined,
          done: true,
        };
      },
    };
  }
}

const tree = new CustomIteratorTree(
  2,
  new CustomIteratorTree(
    1,
    new CustomIteratorTree(4),
    new CustomIteratorTree(5),
  ),
  new CustomIteratorTree(
    3,
    new CustomIteratorTree(5),
    new CustomIteratorTree(6),
  ),
);

for (const el of tree) {
  console.log(el);
}

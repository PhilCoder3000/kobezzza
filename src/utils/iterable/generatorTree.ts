export class GeneratorTree {
  value: number;
  left: Nullable<GeneratorTree>;
  right: Nullable<GeneratorTree>;

  constructor(
    value: number,
    left: Nullable<GeneratorTree> = null,
    right: Nullable<GeneratorTree> = null,
  ) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  *[Symbol.iterator](): IterableIterator<number> {
    yield this.value

    if (this.left !== null) {
      yield* this.left
      // yield* this.left === for (const el of this.left) {
      //   yield el
      // }
    }
    if (this.right !== null) {
      yield* this.right
    }
  }
}

const tree = new GeneratorTree(
  2,
  new GeneratorTree(
    1,
    new GeneratorTree(4),
    new GeneratorTree(5),
  ),
  new GeneratorTree(
    3,
    new GeneratorTree(5),
    new GeneratorTree(6),
  ),
);

for (const el of tree) {
  console.log(el);
}

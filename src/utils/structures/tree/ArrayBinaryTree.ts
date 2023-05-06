export class BinaryTreeNode {
  #value: number;
  constructor(value: number) {
    this.#value = value;
  }

  get value(): number {
    return this.#value;
  }
}

export class ArrayBinaryTree {
  #root: Nullable<BinaryTreeNode> = null;
  #array: BinaryTreeNode[] = [];
  #length = 0;

  // #getRight(index: number): BinaryTreeNode {
  //   return this.#array[2 * index + 2];
  // }

  // #getLeft(index: number) {
  //   return this.#array[2 * index + 1];
  // }

  getMin(): Nullable<BinaryTreeNode> {
    if (!this.#root) {
      return null;
    }
    let parentIndex = 0,
      leftIndex = 2 * parentIndex + 1

    while (leftIndex < this.#length) {
      parentIndex = leftIndex << 1;
      leftIndex = 2 * parentIndex + 1;
    }

    return this.#array[parentIndex]
  }

  getMax(): Nullable<BinaryTreeNode> {
    if (!this.#root) {
      return null;
    }
    let parentIndex = 0,
      rightIndex = 2 * parentIndex + 2

    while (rightIndex < this.#length) {
      rightIndex = 2 * parentIndex + 2;
      parentIndex = rightIndex;
    }

    return this.#array[parentIndex]
  }
}

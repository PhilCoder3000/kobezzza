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

  getMin(): Nullable<BinaryTreeNode> {
    if (!this.#root) {
      return null;
    }
    let parentIndex = 0,
      leftIndex = 2 * parentIndex + 1;

    while (leftIndex < this.#length) {
      parentIndex = leftIndex << 1;
      leftIndex = 2 * parentIndex + 1;
    }

    return this.#array[parentIndex];
  }

  getMax(): Nullable<BinaryTreeNode> {
    if (!this.#root) {
      return null;
    }
    let parentIndex = 0,
      rightIndex = 2 * parentIndex + 2;

    while (rightIndex < this.#length) {
      rightIndex = 2 * parentIndex + 2;
      parentIndex = rightIndex;
    }

    return this.#array[parentIndex];
  }

  sort(tree: BinaryTreeNode[], length: number, rootIndex: number): void {
    let largestIndex = 0,
      leftIndex = 2 * largestIndex + 1,
      rightIndex = 2 * largestIndex + 2;

    if (
      largestIndex < length &&
      tree[leftIndex].value > tree[largestIndex].value
    ) {
      largestIndex = leftIndex;
    }

    if (
      rightIndex < length &&
      tree[rightIndex].value > tree[largestIndex].value
    ) {
      largestIndex = rightIndex;
    }

    if (largestIndex !== rootIndex) {
      let swap = tree[rootIndex];
      tree[rootIndex] = tree[largestIndex];
      tree[largestIndex] = swap;

      this.sort(tree, length, largestIndex);
    }
  }
}

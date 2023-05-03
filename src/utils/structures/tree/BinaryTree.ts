export class BinaryTreeNode {
  parent: Nullable<BinaryTreeNode> = null;
  left: Nullable<BinaryTreeNode> = null;
  right: Nullable<BinaryTreeNode> = null;
  constructor(private _value: number) {}

  get value(): number {
    return this._value;
  }
}

export class BinaryTree {
  #root: Nullable<BinaryTreeNode> = null;

  insertRecursive(node: BinaryTreeNode) {
    if (this.#root == null) {
      this.#root = node;
    }

    const recursiveHelper = (
      newNode: BinaryTreeNode,
      parent: BinaryTreeNode,
    ) => {
      if (newNode.value > parent.value) {
        if (parent.right) {
          recursiveHelper(newNode, parent.right);
        } else {
          parent.right = newNode;
        }
      }
      if (newNode.value < parent.value) {
        if (parent.left) {
          recursiveHelper(newNode, parent.left);
        } else {
          parent.left = newNode;
        }
      }
    };

    recursiveHelper(node, this.#root);
  }

  getMax() {
    let result = this.#root;

    while (result?.right) {
      result = result.right;
    }

    return result;
  }

  getMin() {
    let result = this.#root;

    while (result?.left) {
      result = result.left;
    }

    return result;
  }

  findRecursive(search: number) {
    const recursiveHelper = (
      node: Nullable<BinaryTreeNode>,
    ): Nullable<BinaryTreeNode> => {
      if (!node) {
        return null;
      }
      if (search === node.value) {
        return node;
      }
      if (search > node.value) {
        return recursiveHelper(node.right);
      }
      return recursiveHelper(node.left);
    };

    return recursiveHelper(this.#root);
  }

  delete(value: number) {
    const deletedNode = this.findRecursive(value);
    if (deletedNode == null) {
      return;
    }
    if (deletedNode.parent) {
      if (deletedNode.left == null && deletedNode.right == null) {
        if (deletedNode.parent.value > deletedNode.value) {
          deletedNode.parent.left = null;
        } else {
          deletedNode.parent.right = null;
        }
      } else if (deletedNode.left == null && deletedNode.right != null) {
        if (deletedNode.parent.value > deletedNode.value) {
          deletedNode.parent.left = deletedNode.right;
        } else {
          deletedNode.parent.right = deletedNode.right;
        }
      } else if (deletedNode.left != null && deletedNode.right == null) {
        if (deletedNode.parent.value > deletedNode.value) {
          deletedNode.parent.left = deletedNode.left;
        } else {
          deletedNode.parent.right = deletedNode.left;
        }
      }
    }
  }
}

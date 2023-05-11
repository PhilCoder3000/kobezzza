export class BinaryTreeNode {
  parent: Nullable<BinaryTreeNode> = null;
  left: Nullable<BinaryTreeNode> = null;
  right: Nullable<BinaryTreeNode> = null;
  #value: number;
  constructor(value: number) {
    this.#value = value;
  }

  get value(): number {
    return this.#value;
  }
}

export class LinkedBinaryTree {
  #root: Nullable<BinaryTreeNode> = null;

  getMin(): Nullable<BinaryTreeNode> {
    if (!this.#root) {
      return null;
    }
    let cursor = this.#root;
    while (cursor.left) {
      cursor = cursor.left;
    }
    return cursor;
  }

  getMax(): Nullable<BinaryTreeNode> {
    if (!this.#root) {
      return null;
    }
    let cursor = this.#root;
    while (cursor.right) {
      cursor = cursor.right;
    }
    return cursor;
  }

  find(value: number): Nullable<BinaryTreeNode> {
    if (!this.#root) {
      return null;
    }
    let cursor: Nullable<BinaryTreeNode> = this.#root;
    while (cursor?.value !== value) {
      if (cursor == null) {
        return null;
      }
      if (value < cursor.value) {
        cursor = cursor.left;
      } else {
        cursor = cursor.right;
      }
    }
    return cursor;
  }

  insert(value: number): void {
    if (!this.#root) {
      this.#root = new BinaryTreeNode(value);
      return;
    }
    let cursor = this.#root;
    while (true) {
      if (cursor.value === value) {
        throw new Error('Node already exists');
      }
      if (value < cursor.value) {
        if (!cursor.left) {
          cursor.left = new BinaryTreeNode(value);
          break;
        } else {
          cursor = cursor.left;
        }
      } else {
        if (!cursor.right) {
          cursor.right = new BinaryTreeNode(value);
          break;
        } else {
          cursor = cursor.right;
        }
      }
    }
  }

  delete(value: number): Nullable<BinaryTreeNode> {
    if (!this.#root) {
      return null;
    }
    let node = this.find(value);
    if (!node) {
      return null;
    }
    const parent = node.parent;
    if (!parent) {
      this.#root = null;
      return node;
    }
    if (node.left == null && node.right == null) {
      if (parent.value > value) {
        parent.left = null;
      } else {
        parent.right = null;
      }
      return node;
    } else if (node.left != null && node.right == null) {
      if (parent.value > value) {
        parent.left = node.left;
      } else {
        parent.right = node.left;
      }
      return node;
    } else if (node.left == null && node.right != null) {
      if (parent.value > value) {
        parent.left = node.right;
      } else {
        parent.right = node.right;
      }
      return node;
    } else if (node.left != null && node.right != null) {
      let minNode = node.right;
      while (true) {
        if (minNode.left == null) {
          if (parent.value > value) {
            parent.left = minNode;
          } else {
            parent.right = minNode;
          }
          this.delete(minNode.value);
        } else {
          minNode = minNode.left;
        }
      }
    }
    return null;
  }

  preOrder(node: Nullable<BinaryTreeNode>) {
    if (!this.#root) {
      return;
    }
    if (node) {
      console.log(node.value);
      this.preOrder(node.left);
      this.preOrder(node.right);      
    }
  }

  inOrder(node: Nullable<BinaryTreeNode>) {
    if (!this.#root) {
      return;
    }
    if (node) {
      this.inOrder(node.left);
      console.log(node.value);
      this.inOrder(node.right);
    }
  }

  postOrder(node: Nullable<BinaryTreeNode>) {
    if (!this.#root) {
      return;
    }
    if (node) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node.value);
    }
  }
}

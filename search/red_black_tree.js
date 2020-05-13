/**
 * 红黑树
 */

const RED = true;
const BLACK = false;

class Node {
  constructor(key, val, N, color) {
    this.key = key;
    this.val = val;
    this.N = N;
    this.color = color;
    this.left = null;
    this.right = null;
  }
}

export default class RBTree {
  constructor() {
    this.root = null;
  }

  isEmpty() {
    return this.root === null;
  }

  size() {
    return this.getSize(this.root);
  }

  getSize(node) {
    if (node === null) {
      return 0;
    } else {
      return node.N;
    }
  }

  min() {
    return this.getMin(this.root).key;
  }

  getMin(root) {
    if (root.left === null) return root;
    else return this.getMin(root.left);
  }

  get(key) {
    return this.getNode(this.root, key);
  }

  getNode(root, key) {
    if (root === null) return null;

    if (key < root.key) return this.getNode(root.left, key);
    else if (key > root.key) return this.getNode(root.right, key);
    else return root.val;
  }

  isRed(x) {
    if (x === null) return false;
    return x.color === RED;
  }

  // 左旋转
  rotateLeft(h) {
    const x = h.right;
    h.right = x.left;
    x.left = h;
    x.color = h.color;
    h.color = RED;
    x.N = h.N;
    h.N = 1 + this.getSize(h.left) + this.getSize(h.right);
    return x;
  }

  // 右旋转
  rotateRight(h) {
    const x = h.left;
    h.left = x.right;
    x.right = h;
    x.color = h.color;
    h.color = RED;
    x.N = h.N;
    h.N = 1 + this.getSize(h.left) + this.getSize(h.right);
    return x;
  }

  // 颜色转换
  flipColors(h) {
    h.color = RED;
    h.left.color = BLACK;
    h.right.color = BLACK;
  }

  put(key, val) {
    this.root = this.putNode(this.root, key, val);
    this.root.color = BLACK;
  }

  putNode(h, key, val) {
    if (h === null) {
      return new Node(key, val, 1, RED);
    }

    if (key < h.key) h.left = this.putNode(h.left, key, val);
    else if (key > h.key) h.right = this.putNode(h.right, key, val);
    else h.val = val;

    if (this.isRed(h.right) && !this.isRed(h.left)) h = this.rotateLeft(h);
    if (this.isRed(h.left) && this.isRed(h.left.left)) h = this.rotateRight(h);
    if (this.isRed(h.left) && this.isRed(h.right)) this.flipColors(h);

    h.N = this.getSize(h.left) + this.getSize(h.right) + 1;
    return h;
  }

  balance(h) {
    if (this.isRed(h.right)) h = this.rotateLeft(h);
    if (this.isRed(h.right) && !this.isRed(h.left)) h = this.rotateLeft(h);
    if (this.isRed(h.left) && this.isRed(h.left.left)) h = this.rotateRight(h);
    if (this.isRed(h.left) && this.isRed(h.right)) this.flipColors(h);

    h.N = this.getSize(h.left) + this.getSize(h.right) + 1;
    return h;
  }

  moveRedLeft(h) {
    this.flipColors(h);

    if (this.isRed(h.right.left)) {
      h.right = this.rotateRight(h.right);
      h = this.rotateLeft(h);
    }

    return h;
  }

  deleteMin() {
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
      this.root.color = RED;
    }
    this.root = this.deleteMinNode(this.root);
    if (!this.isEmpty()) {
      this.root.color = BLACK;
    }
  }

  deleteMinNode(h) {
    if (h.left === null) {
      return null;
    }

    if (!this.isRed(h.left) && !this.isRed(h.left.left)) {
      h = this.moveRedLeft(h);
    }

    h.left = this.deleteMinNode(h.left);
    return this.balance(h);
  }

  moveRedRight(h) {
    this.flipColors(h);
    if (!this.isRed(h.left.left)) {
      h = this.rotateRight(h);
    }
    return h;
  }

  deleteMax() {
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
      this.root.color = RED;
    }
    this.root = this.deleteMaxNode(this.root);
    if (!this.isEmpty()) {
      this.root.color = BLACK;
    }
  }

  deleteMaxNode(h) {
    if (this.isRed(h.left)) {
      h = this.rotateRight(h);
    }
    if (h.right === null) {
      return null;
    }
    if (!this.isRed(h.right) && !this.isRed(h.right.left)) {
      h = this.moveRedRight(h);
    }
    h.right = this.deleteMaxNode(h.right);
    return this.balance(h);
  }

  delete(key) {
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
      this.root.color = RED;
    }
    this.root = this.deleteNode(this.root, key);
    if (!this.isEmpty()) {
      this.root.color = BLACK;
    }
  }

  deleteNode(h, key) {
    if (key < h.key) {
      if (!this.isRed(h.left) && !this.isRed(h.left.left)) {
        h = this.moveRedLeft(h);
      }
      h.left = this.deleteNode(h.left, key);
    } else {
      if (this.isRed(h.left)) {
        h = this.rotateRight(h);
      }
      if (key === h.key && h.right === null) {
        return null;
      }
      if (!this.isRed(h.right) && !this.isRed(h.right.left)) {
        h = this.moveRedRight(h);
      }
      if (key === h.key) {
        h.val = this.getNode(h.right, this.getMin(h.right).key);
        h.key = this.getMin(h.right).key;
        h.right = this.deleteMinNode(h.right);
      } else {
        h.right = this.deleteNode(h.right, key);
      }
    }
    return this.balance(h);
  }
}
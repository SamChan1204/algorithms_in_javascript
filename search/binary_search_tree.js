/**
 * 二叉查找树
 */


class Node {
  constructor(key, val, N) {
    this.key = key;
    this.val = val;
    this.N = N;
    this.left = null;
    this.right = null;
  }
}

export default class BST {
  constructor() {
    this.root = null;
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

  get(key) {
    return this.getNode(this.root, key);
  }

  getNode(root, key) {
    if (root === null) return null;

    if (key < root.key) return this.getNode(root.left, key);
    else if (key > root.key) return this.getNode(root.right, key);
    else return root.val;
  }

  put(key, val) {
    this.root = this.putNode(this.root, key, val);
  }

  putNode(root, key, val) {
    if (root === null) return new Node(key, val, 1);

    if (key < root.key) root.left = this.putNode(root.left, key, val);
    else if (key > root.key) root.right = this.putNode(root.right, key, val);
    else root.val = val;
    root.N = this.getSize(root.left) + this.getSize(root.right) + 1;
    return root;
  }

  max() {
    return this.getMax(this.root).key;
  }

  getMax(root) {
    if (root.right === null) return root;
    else return this.getMax(root.right);
  }

  min() {
    return this.getMin(this.root).key;
  }

  getMin(root) {
    if (root.left === null) return root;
    else return this.getMin(root.left);
  }

  floor(key) {
    const node = this.getFloor(this.root, key);
    if (node === null) return null;
    else return node.key;
  }

  getFloor(root, key) {
    if (root === null) return null;

    if (key === root.key) return root;
    else if (key < root.key) return this.getFloor(root.left, key);

    const node = this.getFloor(root.right, key);
    if (node !== null) return node;
    else return root;
  }

  ceiling(key) {
    const node = this.getCeiling(this.root, key);
    if (node === null) return null;
    else return node.key;
  }
  getCeiling(root, key) {
    if (root === null) return null;

    if (key === root.key) return root;
    else if (key > root.key) return this.getCeiling(root.right, key);

    const node = this.getCeiling(root.left, key);
    if (node !== null) return node;
    else return root;
  }

  select(k) {
    return this.selectNode(this.root, k).key;
  }

  selectNode(root, k) {
    if (root === null) return null;

    const t = this.getSize(root.left);
    if (t > k) return this.selectNode(root.left, k);
    else if (t < k) return this.selectNode(x.right, k - t - 1);
    else return x;
  }

  rank(key) {
    return this.getRank(key, this.root);
  }

  getRank(key, root) {
    if (root === null) return 0;

    if (key < root.key) return this.getRank(key, root.left);
    else if (key > root.key) return 1 + this.getSize(root.left) + this.getRank(key, root.right);
    else return this.getSize(root.left);
  }

  delete(key) {
    this.root = this.deleteNode(this.root);
  }

  deleteNode(root, key) {
    if (root === null) return null;

    if (key < root.key) root.left = this.deleteNode(root.left, key);
    else if (key > root.key) root.right = this.deleteNode(root.right, key);
    else {
      if (root.right === null) return root.left;
      if (root.left === null) return root.right;

      const t = root;
      root = this.getMin(t.right);
      root.right = this.deleteMinNode(t.right);
      root.left = t.left;
    }

    root.N = this.getSize(root.left) + this.getSize(root.right) + 1;
    return root;
  }

  deleteMin() {
    this.root = this.deleteMinNode(this.root);
  }

  deleteMinNode(root) {
    if (root.left === null) return root.right;
    root.left = this.deleteMinNode(root.left);
    root.N = this.getSize(root.left) + this.getSize(root.right) + 1;
    return root;
  }

  deleteMax() {
    this.root = this.deleteMaxNode(this.root);
  }

  deleteMaxNode(root) {
    if (root.right === null) return root.left;
    root.right = this.deleteMaxNode(root.right);
    root.N = this.getSize(root.left) + this.getSize(root.right) + 1;
    return root;
  }

  keys() {
    return this.getKeys(this.min(), this.max());
  }

  getKeys(lo, hi) {
    const queue = [];
    this.findKeys(this.root, queue, lo, hi);
    return queue;
  }

  findKeys(root, queue, lo, hi) {
    if (root === null) return;
    if (lo < root.key) this.findKeys(root.left, queue, lo, hi);
    if (lo <= root.key && hi >= root.key) queue.push(root.key);
    if (hi > root.key) this.findKeys(root.right, queue, lo, hi); 
  }
}
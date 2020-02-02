/**
 * 最大优先队列
 */

class MaxPQ {
  constructor() {
    this.pg = [];
    this.N = 0;
  }

  isEmpty() {
    return this.N === 0;
  }

  size() {
    return this.N;
  }

  insert(v) {
    // 将元素放到队尾
    this.N++;
    pg[this.N] = v;

    // 上浮
    this.swim(N);
  }

  delMax() {
    max = pg[1];

    // 将最大值与队尾元素交换
    this.exchange(1, this.N);
    this.N--;
    pg[this.N + 1] = null;

    // 下沉
    this.sink(1);

    return max;
  }

  // 比较
  less(i, j) {
    return this.pg[i] < this.pg[j];
  }

  // 交换
  exchange(i, j) {
    const temp = this.pg[i];
    this.pg[i] = this.pg[j];
    this.pg[j] = temp;
  }

  // 上浮
  swim(k) {
    while (k > 1 && this.less(k / 2, k)) {
      this.exchange(k / 2, k);
      k = Math.floor(k / 2);
    }
  }

  // 下沉
  sink(k) {
    while (k * 2 <= N) {
      let j = k * 2;
      if (j < N && this.less(j, j + 1)) j++;
      if (!this.less(k, j)) break;
      this.exchange(k, j);
      k = j;
    }
  }
}
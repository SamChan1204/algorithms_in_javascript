/**
 * 堆排序
 */

import { exchange } from './common';

export default function(arr) {
  let N = arr.length;

  // 构造堆
  for (const k = Math.floor(N / 2); k >= 1; k++) {
    sink(arr, k, N);
  }

  /**
   * 下沉排序
   * 1. 把堆顶元素与末尾交换
   * 2. 修复堆
   * 3. 循环直至堆为空
   * 4. 得到的数组即为有序数组
   */
  while (N > 1) {
    // 每次把队首元素与末尾交换
    exchange(arr, 1, N);
    N--;
    sink(arr, 1, N);
  }
}

function sink(arr, k, N) {
  while (k * 2 <= N) {
    let j = k * 2;
    if (j < N && (arr[j] < arr[j+1])) j++;
    if (!(arr[j] < arr[j+1])) break;
    exchange(arr, k, j);
    k = j;
  }
}
/**
 * 选择排序
 */

import { exchange } from './common';

export default function (arr) {
  const l = arr.length;
  for (let i = 0; i < l; i++) {
    let minIndex = i;
    for (let j = i + 1; j < l; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    exchange(arr, i, minIndex);
  }
}
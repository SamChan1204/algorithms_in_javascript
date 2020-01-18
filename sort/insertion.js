/**
 * 插入排序
 */

import { exchange } from './common';

export default function (arr) {
  const l = arr.length;
  for (let i = 0; i < l; i++) {
    for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      exchange(arr, j, j - 1);
    }
  }
}
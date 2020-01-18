/**
 * 希尔排序
 */

import { exchange } from './common';

export default function (arr) {
  const l = arr.length;
  const h = 1;
  while(h < l / 3) h = 3 * h + 1;
  while (h >= 1) {
    for (let i = h; i < l; i++) {
      for (let j = i; j >= h && arr[j] < arr[j - h]; j -= h) {
        exchange(arr, j, j - h);
      }
    }
    h = Math.floor(h / 3);
  }
}
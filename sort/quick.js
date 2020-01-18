/**
 * 快速排序
 */

import { exchange } from './common';

export default function(arr) {
  sort(arr, 0, arr.length - 1);
}

function sort(arr, start, end) {
  if (end <= start) return;

  const mid = partition(arr, start, end);

  sort(arr, start, mid - 1);
  sort(arr, mid, end);
}

function partition(arr, start, end) {
  let i = start;
  let j = end + 1;

  const val = arr[start];

  while(true) {
    while (arr[++i] < val) {
      if (i === end) break;
    }
    while (val < arr[--j]) {
      if (j === start) break;
    }
    if (i >= j) break;

    exchange(arr, i, j);
  }

  exchange(arr, start, j);
  return j;
}
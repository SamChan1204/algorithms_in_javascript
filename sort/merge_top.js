/**
 * 自顶向下的归并排序
 */

import { resetTmp, merge } from './merge_common';

export default function(arr) {
  resetTmp();
  sort(arr, 0, arr.length - 1);
}

function sort(arr, start, end) {
  if (end <= start) return;

  const mid = start + Math.floor((end - start) / 2);

  sort(arr, start, mid);
  sort(arr, mid + 1, end);
  merge(arr, start, mid, end);
}
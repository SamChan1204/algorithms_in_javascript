/**
 * 自底向上的归并排序
 */

import { resetTmp, merge } from './merge_common';

export default function(arr) {
  resetTmp();

  const l = arr.length;
  for (let sz = 1; sz < l; sz *= 2) {
    for (let start = 0; start < l - sz; start += 2 * sz) {
      merge(arr, start, start + sz - 1, Math.min(start + 2 * sz - 1, l - 1));
    }
  }
}
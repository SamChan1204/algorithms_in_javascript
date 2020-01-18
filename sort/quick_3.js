/**
 * 三向切分的快速排序(重复元素)
 */

import { exchange } from './common';

export default function(arr) {
  sort(arr, 0, arr.length - 1);
}

function sort(arr, start, end) {
  if (end <= start) return;

  let lt = start;
  let i = start + 1;
  let gt = end;

  const val = arr[start];

  while(i <= gt) {
    if (arr[i] < val) {
      exchange(arr, lt, i);
      lt++;
      i++;
    } else if (arr[i] > val) {
      exchange(arr, i, gt);
      gt--;
    } else {
      i++;
    }
  }

  sort(arr, start, lt - 1);
  sort(arr, gt + 1, end);
}
/**
 * 归并操作，假设左右两半都是有序的
 */
let tmp = [];
export const resetTmp = () => tmp = [];
export const merge = (arr, start, mid, end) => {
  let i = start;
  let j = mid + 1;
  

  for (let k = start; k <= end; k++) {
    tmp[k] = arr[k];
  }

  for (let k = start; k <= end; k++) {
    if (i > mid) { // 左边用尽取右边
      arr[k] = tmp[j++];
    } else if (j > end) { // 右边用尽取左边
      arr[k] = tmp[i++];
    } else if (tmp[j] < tmp[i]) { // 否则取更小的
      arr[k] = tmp[j++];
    } else {
      arr[k] = tmp[i++];
    }
  }
}
export const exchange = (arr, first, second) => {
  const temp = arr[second];
  arr[second] = arr[first];
  arr[first] = temp;
}

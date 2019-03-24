function myReduce(arr, callback, initVal) {
  let total = 0;
  if (arr[0]) total = arr[0];
  if (initVal) total += initVal;
  for (var i = 1; i < arr.length; i++) {
    total = callback(total, arr[i], i, arr)
  };
  return total;
};

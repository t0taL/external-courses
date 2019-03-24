function mySlice(arr, begin, end) {
  let result = [];
  if (!begin) {
    begin = 0;
  } else if (begin < 0) {
    begin += arr.length;
  };
  if (!end) {
    end = arr.length;
  } else if (end < 0) {
    end += arr.length;
  };
  for (var i = begin; i < end; i++) {
    if (arr[i]) result.push(arr[i]);
  };
  return result;
};

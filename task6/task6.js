function myReduce(arr, callback, initVal) {
	var total;
	if (initVal) {
		total = initVal;
		for (var i = 0; i < arr.length; i++) {
			total = callback(total, arr[i], i, arr)
		};
	} else {
		total = arr[0];
		for (var i = 1; i < arr.length; i++) {
			total = callback(total, arr[i], i, arr)
		};
	};
	return total;
};

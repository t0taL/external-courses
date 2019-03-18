function reverse(str) {
	var result = [],
	arr = str.split('');
	for (var i = 0; i < arr.length; i++) {
		result.unshift(arr[i]);
	};
	result = result.join('');
	return result;
};

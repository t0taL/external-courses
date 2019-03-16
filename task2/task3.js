function count(arr) {
	var result = [0, 0, 0];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === 0) {
			result[2] += 1;
		} else if (arr[i]%2 === 0) {
			result[0] += 1;
		} else {
			result[1] += 1;
		}
	};
	if (result[2] === 0) {
		console.log('четных: ' + result[0] + ';' + ' нечетных: ' + result[1] + ';');
	} else {
		console.log('четных: ' + result[0] + ';' + ' нечетных: ' + result[1] + ';' + ' нуль: ' + result[2] + ';');
	};
	return result;
};

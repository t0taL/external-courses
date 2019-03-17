function count(arr) {
	var even = 0,
	noteven = 0,
	zero = 0;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === 0) {
			zero++;
		} else if (arr[i]%2 === 0) {
			even++;
		} else {
			noteven++;
		}
	};
	if (zero === 0) {
		console.log('четных: ' + even + ';' + ' нечетных: ' + noteven + ';');
	} else {
		console.log('четных: ' + even + ';' + ' нечетных: ' + noteven + ';' + ' нуль: ' + zero + ';');
	};
	return [even, noteven, zero];
};

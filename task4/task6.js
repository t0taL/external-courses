function eachCapLet(str) {
	var arr = str.split(' ');
	var result;
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
	};
	result = arr.join(' ');
	return result;
};

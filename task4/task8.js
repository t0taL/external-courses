function toLowerCamelCase(str) {
	var arr = str.split(' '),
	result;
	arr[0] = arr[0].toLowerCase();
	for (var i = 1; i < arr.length; i++) {
		arr[i] = arr[i][0].toUpperCase() + arr[i].toLowerCase().slice(1);
	};
	result = arr.join('');
	return result;
};

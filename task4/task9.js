function insert(str, num, focusStr) {
	var result;
	var arr = str.split(' ');
	arr.splice(num, 0, focusStr);
	result = arr.join(' ');
	return result;
};

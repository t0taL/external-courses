function cutStr(str, num) {
	var result = str;
	if (str.length > num) {
		result = str.substr(0, num - 3) + '«…»';		
	};
	return result;
};

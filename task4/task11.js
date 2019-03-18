function count(str) {
	var symbObj = {},
	result = {};
	for (var i = 0; i < str.length; i++) {
		if (str[i] !== ' ') {
			symbObj[i] = str[i];
		};
	};

	for (var i = 0; i < str.length; i++) {
		if (str[i] !== ' ') {
			result[str[i]] = 0;
		};
	};

	for (var key in symbObj) {
		for (var k in result) {
			if (symbObj[key] === k) {
				result[k]++;
			};
		};
	};
	
	for (var key in result) {
		console.log(key + ': ' + result[key]);
	};
};

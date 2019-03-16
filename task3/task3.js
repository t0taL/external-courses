function checkProp(str, obj) {
	for (var key in obj) {
		if (key === str) {
			return true;
		};
	};
	return false;
};

function modObj(str, obj) {
	for (var key in obj) {
		if (key === str) {
			return obj;
		};
	};
	obj[str] = 'new';
	return obj;
};

function copyObj(obj) {
	var newObj = {};
	for (var key in obj) {
		newObj[key] = obj[key];
	};
	return newObj;
};

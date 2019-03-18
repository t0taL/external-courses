function randomNum(min, max) {
	var result = min + Math.random() * (max - min);
	result = Math.round(result);
	return result;
};

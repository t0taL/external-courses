function count(str) {
	var result = {};
	for (var i = 0; i < str.length; i++) {
        if (str[i] !== ' ') {
            result[str[i]] = 0;
        };
    };
    
	for (var i = 0; i < str.length; i++) {
        for (var key in result) {
            if (key === str[i]) {
                result[key]++;
            };
        };
    };
    
    for (var key in result) {
		console.log(key + ': ' + result[key]);
	};
};

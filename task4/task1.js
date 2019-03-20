var protObj = {
	prop1: 1,
	prop2: 2,
	prop3: 3,
	prop4: 4,
	prop5: 5
	};

var mainObj = Object.create(protObj);
mainObj.prop7 = 7;
mainObj.prop8 = 8;

function searchProp(prop, obj) {
	for (var key in Object.getPrototypeOf(obj)) {
		if (key === prop) {
			console.log(key + ': ' + Object.getPrototypeOf(obj)[key]);
		};
	};
	console.log('Not found');
};

searchProp('prop3', mainObj);
searchProp('prop7', mainObj);
searchProp('prop5', mainObj);
searchProp('prop8', mainObj);

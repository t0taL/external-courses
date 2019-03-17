function test(num) {
	if (num > 1000) {
		console.log('Данные неверны!');
	} else if (num === 0) {
		console.log('Число ' + num + ' - не является натуральным числом и, соответственно, не является ни простым, ни составным числом!')
	} else if (num === 1) {
		console.log('Число ' + num + ' - не является ни простым, ни составным числом!')
	} else if (num === 2) {
		console.log('Число ' + num + ' - простое число!')
	} else if (num%2 === 0) {
		console.log('Число ' + num + ' - составное число!')
	} else {
		console.log('Число ' + num + ' - простое число!')
	};
};

var Calculator = {
    result: 0,
    add: function(num) {
        if (typeof(num) !== 'undefined') {
            Calculator.result += num;
        };
        return function(num) {
            return Calculator.add(num);
        };
    },
    subtract: function(num) {
        if (typeof(num) !== 'undefined') {
            Calculator.result -= num;  
        };
        return function(num) {
            return Calculator.subtract(num);
        };  
    },
    divide: function(num) {
        if (typeof(num) !== 'undefined') {
            Calculator.result /= num;
        };
        return function(num) {
            return Calculator.divide(num);
        };
    },
    multiply: function(num) {
        if (typeof(num) !== 'undefined') {
            Calculator.result *= num;
        };
        return function(num) {
            return Calculator.multiply(num);
        };
    },
    getResult: function() {
        return Calculator.result;
    },
    reset: function() {
        Calculator.result = 0;
        return Calculator.result;
    },
};

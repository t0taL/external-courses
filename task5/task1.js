var Calculator = (function() {
  var _result = 0,
      _Calculator = {};
  _Calculator.add = function(num) {
    if (num) _result += num;
    return function(num) {
      return _Calculator.add(num);
    };
  };
  _Calculator.subtract = function(num) {
    if (num) _result -= num;
    return function(num) {
      return _Calculator.subtract(num);
    };
  };
  _Calculator.divide = function(num) {
    if (num) _result /= num;
    return function(num) {
      return _Calculator.divide(num);
    };
  };
  _Calculator.multiply = function(num) {
    if (num) _result *= num;
    return function(num) {
      return _Calculator.multiply(num);
    };
  };
  _Calculator.reset = function() {
    _result = 0;
    return _result;
  };
  _Calculator.getResult = function() {
    return _result;
  };
  return _Calculator;
})();

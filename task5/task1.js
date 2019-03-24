const Calculator = (function() {
  let _result = 0,
      _Calculator = {};
  _Calculator.add = function(num) {
    if (num) _result += num;
    return _Calculator.add;
  };
  _Calculator.subtract = function(num) {
    if (num) _result -= num;
    return _Calculator.subtract;
  };
  _Calculator.divide = function(num) {
    if (num) _result /= num;
    return _Calculator.divide;
  };
  _Calculator.multiply = function(num) {
    if (num) _result *= num;
    return _Calculator.multiply;
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
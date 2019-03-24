var Calculator = new function() {
  var result = 0;
  this.add = function(num) {
    if (num) result += num;
    return function(num) {
      return Calculator.add(num);
    };
  };
  this.subtract = function(num) {
    if (num) result -= num;
    return function(num) {
      return Calculator.subtract(num);
    };
  };
  this.divide = function(num) {
    if (num) result /= num;
    return function(num) {
      return Calculator.divide(num);
    };
  };
  this.multiply = function(num) {
    if (num) result *= num;
    return function(num) {
      return Calculator.multiply(num);
    };
  };
  this.reset = function() {
    result = 0;
    return result;
  };
  this.getResult = function() {
    return result;
  };
};

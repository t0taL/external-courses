var Calculator = new function() {
  var result = 0,
      target = this;
  this.add = function(num) {
    if (num) result += num;
    return function(num) {
      return target.add(num);
    };
  };
  this.subtract = function(num) {
    if (num) result -= num;
    return function(num) {
      return target.subtract(num);
    };
  };
  this.divide = function(num) {
    if (num) result /= num;
    return function(num) {
      return target.divide(num);
    };
  };
  this.multiply = function(num) {
    if (num) result *= num;
    return function(num) {
      return target.multiply(num);
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

const Calculator = new function () {
  let _result = 0;
  this.add = function (num) {
    if (num) _result += num;
    return this;
  };
  this.subtract = function (num) {
    if (num) _result -= num;
    return this;
  };
  this.divide = function (num) {
    if (num) _result /= num;
    return this;
  };
  this.multiply = function (num) {
    if (num) _result *= num;
    return this;
  };
  this.setState = function (num) {
    _result = num;
    return this;
  };
  this.fetchData = function (callback) {
    setTimeout(() => {
      callback(500);
      console.log(this.getResult());
    }, 3000);
    
    return this;
  };
  this.reset = function () {
    _result = 0;
    return this;
  };
  this.getResult = function () {
    return _result;
  };
};

Calculator.fetchData(Calculator.setState); // через 3 секунды изменит стейт результата на 500.
console.log(Calculator.getResult()); // 0
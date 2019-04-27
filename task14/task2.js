function Hangman(word) {
  let _word = word.toLowerCase(),
    _errors = 6,
    _wrongLetters = [],
    _result = '_'.repeat(_word.length);
  this.guess = function (letter) {
    const Letter = letter.toLowerCase();
    if (!_errors) console.log('You lost! Game Over!');
    else if (_result.indexOf('_') === -1) console.log('Congratulations! You won!');
    else if (_word.indexOf(Letter) !== -1) {
      for (let i = 0; i < _word.length; i++) {
        if (_word[i] === Letter) _result = `${_result.substr(0, i)}${Letter}${_result.substr(i + 1)}`;
      };
      (_result.indexOf('_') === -1) ? console.log(`${_result} | You won!`) : console.log(_result);
    } else {
      _errors--;
      _wrongLetters.push(Letter);
      (_errors) ? console.log(`wrong letter, errors left ${_errors} | ${_wrongLetters.join(',')}`) :
        console.log(`wrong letter, errors left ${_errors} | ${_wrongLetters.join(',')} | ${_result} | You lost!`);
    };
    return this;
  };
  this.getGuessedString = function () {
    return _result;
  };
  this.getErrorsLeft = function () {
    return _errors;
  };
  this.getWrongSymbols = function () {
    return _wrongLetters;
  };
  this.getStatus = function () {
    return `${_result} | errors left ${_errors}`;
  };
  this.startAgain = function (nWord) {
    _word = nWord.toLowerCase();
    _errors = 6;
    _wrongLetters = [];
    _result = '_'.repeat(_word.length);
    return this;
  };
};
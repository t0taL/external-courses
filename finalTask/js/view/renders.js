// -------------------------------------
// -----------Render elems--------------
// -------------------------------------

// books render
function renderBooks (arr) {
  const itemBox = document.querySelector('.main-container__content');
// cleaning space
  while (itemBox.firstChild) {
    itemBox.removeChild(itemBox.firstChild);
  };
// rendering books
  arr.forEach(book => {
    let bookElem = new Book;
    bookElem.addId(book.id);
    bookElem.addImgSrc(book.image_url);
    bookElem.addTitle(book.title);
    bookElem.addAuthor(book.author.firstName, book.author.lastName);
    bookElem.addRating(book.rating);
    bookElem.addBookOnPage();
  });
};

// history render
function renderHistory (text, time) {
  const lastHistories = [],
    newLocalHistory = localHistory();
  return (function (text, time) {
    let history = new History;
    history.currentActionInfo(text);
    history.currentActionTime(time);
    history.addActionOnPage();
// time update
    history.updateTime = setInterval(() => {
      history.currentActionTime(time);
      history.updateHistoryTime();
    }, 60000);
// saving & clearing history items
    if (newLocalHistory.length >= 3 && lastHistories.length >= 3) {
      clearInterval(lastHistories.pop().updateTime);
      lastHistories.unshift(history);
      newLocalHistory.shift();
      newLocalHistory.push({text: text, time: time});
    } else {
      lastHistories.unshift(history);
      newLocalHistory.push({text: text, time: time});
    };
    localStorage.setItem('HISTORY', JSON.stringify(newLocalHistory));
  })(text, time);
};
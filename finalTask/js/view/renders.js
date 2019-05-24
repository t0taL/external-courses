// -------------------------------------
// -----------Render elems--------------
// -------------------------------------

// books render
function renderBooks (arr) {
  const itemBox = document.querySelector('.main-container_content');
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
  let history = new History;
  history.currentActionInfo(text);
  history.currentActionTime(time);
  history.addActionOnPage();
// saving & cleaning of history items
  let newLocalHistory = localHistory();
  if (newLocalHistory.length >= 3) {
    newLocalHistory.shift();
    newLocalHistory.push({text: text, time: time});
  } else newLocalHistory.push({text: text, time: time});
  localStorage.setItem('HISTORY', JSON.stringify(newLocalHistory));
// time update
  setInterval(() => {
    history.currentActionTime(time);
    history.addActionOnPage();
  }, 60000);
};
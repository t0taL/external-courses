import {localBooks} from './localData.js';
import {Book, History} from './constructors.js';

// -------------------------------------
// ----------History render-------------
// -------------------------------------

export function localHistory () {
  let history;
  if (localStorage['HISTORY']) history = JSON.parse(localStorage['HISTORY']);
  else history = [];
  return history;
}

export function renderHistory (text, time) {
  let history = new History;
  history.currentActionInfo(text);
  history.currentActionTime(time);
  history.addActionOnPage();

  let newLocalHistory = localHistory();
  if (newLocalHistory.length >= 3) {
    newLocalHistory.shift();
    newLocalHistory.push({text: text, time: time});
  } else newLocalHistory.push({text: text, time: time});
  localStorage.setItem('HISTORY', JSON.stringify(newLocalHistory));


  setInterval(() => {
    history.currentActionTime(time);
    history.addActionOnPage();
  }, 60000);
}

// -------------------------------------
// -----------Books render--------------
// -------------------------------------

export function renderBooks (arr) {
  const itemBox = document.querySelector('.main-container_content');
// cleaning space
  while (itemBox.firstChild) {
    itemBox.removeChild(itemBox.firstChild);
  }
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

// -------------------------------------
// ------------Start Page---------------
// -------------------------------------

export function start () {
  renderBooks(localBooks());
  if (localHistory().length > 0) localHistory().forEach(history => renderHistory(history['text'], new Date(history['time'])));
  inputSearch.value = '';
};
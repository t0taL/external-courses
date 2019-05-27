// -------------------------------------
// -----Start loading & local items-----
// -------------------------------------

// Getting books obj from server
function myFetch (method, url) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, false);
  xhr.send();
  if (xhr.status === 200) return JSON.parse(xhr.responseText);
  else console.log(`Load books ERROR: ${xhr.status} : ${xhr.statusText}`);
};

// Upload data to localStorage
(function toLocalStorage () {
  if (!localStorage['BOOKS']) localStorage.setItem('BOOKS', JSON.stringify(myFetch('GET', 'https://rsu-library-api.herokuapp.com/books')));
})();

// getting local books
function localBooks () {
  let books = JSON.parse(localStorage['BOOKS']);
  return books;
};

// getting local history
function localHistory () {
  let history;
  if (localStorage['HISTORY']) history = JSON.parse(localStorage['HISTORY']);
  else history = [];
  return history;
}

// start page loading
(function start () {
  renderBooks(localBooks());
  if (localHistory().length > 0) localHistory().forEach(history => renderHistory(history['text'], new Date(history['time'])));
  inputSearch.value = '';
})();
// local books from localStorage
export function localBooks () {
  let books = JSON.parse(localStorage['BOOKS']);
  return books;
};

// local history from localStorage
export function localHistory () {
  let history;
  if (localStorage['HISTORY']) history = JSON.parse(localStorage['HISTORY']);
  else history = [];
  return history;
}
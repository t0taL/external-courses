// localStorage.clear();
// Getting books obj from server
function myFetch () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rsu-library-api.herokuapp.com/books', false);
  xhr.send();
  if (xhr.status === 200) return JSON.parse(xhr.responseText);
  else console.log(`Load books ERROR: ${xhr.status} : ${xhr.statusText}`);
};

if (!localStorage['BOOKS']) localStorage.setItem('BOOKS', JSON.stringify(myFetch()));

function localBooks () {
  let books = JSON.parse(localStorage['BOOKS']);
  return books;
};

// -------------------------------------
// ---------Book constructor------------
// -------------------------------------

class Book {
  constructor () {
// getting elem
    this.wrap = document.querySelector('.main-container_content');
// creating elems
    this.item = document.createElement('div');
    this.img = document.createElement('img');
    this.title = document.createElement('span');
    this.author = document.createElement('span');
    this.rating = document.createElement('div');
    this.stars = [];
    for (let i = 0; i < 5; i++) {
      this.stars[i] = document.createElement('i');
    };
// to add css classes
    this.item.className = 'main-container_content_item';
    this.rating.className = 'main-container_content_item_rating';
// there are methods for filling elems
    this.addId = function(num) {
      this.item.id = num;
    };
    this.addImgSrc = function (src) {
      this.img.src = src;
    };
    this.addTitle = function (text) {
      this.title.innerHTML = text;
    };
    this.addAuthor = function (firstName, lastName) {
      this.author.innerHTML = `by ${firstName} ${lastName}`;
    };
    this.addRating = function (rating) {
      for (let i = 0; i < 5; i++) {
        if (i < rating - 1) this.stars[i].className = 'fas fa-star main-container_content_item_rating_star';
        else if (i == rating - 1 || i == rating - 0.5) {
          if ((rating ^ 0) == rating) this.stars[i].className = 'fas fa-star main-container_content_item_rating_star';
          else this.stars[i].className = 'fas fa-star-half-alt main-container_content_item_rating_star';
        }
        else this.stars[i].className = 'far fa-star main-container_content_item_rating_star';
      };
    };
// to add listeners for rating
    this.stars.forEach(star => star.addEventListener('mousemove', (e) => this.hoverRating(e)));
    this.stars.forEach(star => star.addEventListener('mouseout', (e) => this.returnRating(e)));
    this.stars.forEach(star => star.addEventListener('click', (e) => this.changeRating(e)));
// there are functions for rating listeners
    this.hoverRating = function (e) {
      for (let i = 0; i < 5; i++) {
        if (this.stars[i] === e.target) {
          if (e.pageX > e.target.offsetLeft + 8) this.stars[i].className = 'fas fa-star main-container_content_item_rating_star';
          else this.stars[i].className = 'fas fa-star-half-alt main-container_content_item_rating_star';
        }
        else if (this.rating === e.target.parentNode) this.stars[i].className = 'fas fa-star main-container_content_item_rating_star';
        else break;
      }
      for (let j = 5 - 1; j >= 0; j--) {
        if (this.rating === e.target.parentNode && this.stars[j] !== e.target) this.stars[j].className = 'far fa-star main-container_content_item_rating_star';
        else break;
      }
    }
    this.returnRating = function (e) {
      const targetBookRating = localBooks()[e.target.parentNode.parentNode.id - 1].rating;
      for (let i = 0; i < 5; i++) {
        if (i < targetBookRating - 1) this.stars[i].className = 'fas fa-star main-container_content_item_rating_star';
        else if (i == targetBookRating - 1 || i == targetBookRating - 0.5) {
          if ((targetBookRating ^ 0) == targetBookRating) this.stars[i].className = 'fas fa-star main-container_content_item_rating_star';
          else this.stars[i].className = 'fas fa-star-half-alt main-container_content_item_rating_star';
        }
        else this.stars[i].className = 'far fa-star main-container_content_item_rating_star';
      }
    }
    this.changeRating = function (e) {
      let targetBookRating = localBooks()[e.target.parentNode.parentNode.id - 1].rating,
        newTargetBookRating = 0,
        newLocalBooks = localBooks();
      for (let i = 0; i < 5; i++) {
        if (this.stars[i] === e.target) {
          if (targetBookRating == i + 1 && e.target.classList.contains('fa-star')) newLocalBooks[e.target.parentNode.parentNode.id - 1].rating = 0;
          else if (targetBookRating == i + 0.5 && e.target.classList.contains('fa-star-half-alt')) newLocalBooks[e.target.parentNode.parentNode.id - 1].rating = 0;
          else if (this.stars[i].classList.contains('fa-star-half-alt')) newLocalBooks[e.target.parentNode.parentNode.id - 1].rating = i + 0.5;
          else newLocalBooks[e.target.parentNode.parentNode.id - 1].rating = i + 1;
        }
      }
      localStorage.setItem('BOOKS', JSON.stringify(newLocalBooks));
      newTargetBookRating = localBooks()[e.target.parentNode.parentNode.id - 1].rating;
      renderHistory(`You change the rating of <b>${this.title.innerHTML}</b> by <b>${this.author.innerHTML.slice(3)}</b> to <b>${newTargetBookRating}</b> from <b>${targetBookRating} stars</b>.`, new Date());
    }
// to add elems on page
    this.addBookOnPage = function () {
      this.wrap.appendChild(this.item);
      this.item.appendChild(this.img);
      this.item.appendChild(this.title);
      this.item.appendChild(this.author);
      this.item.appendChild(this.rating);
      for (let i = 0; i < 5; i++) {
        this.rating.appendChild(this.stars[i]);
      };
    };
  };
};



// -------------------------------------
// --------------Filter-----------------
// -------------------------------------

(function BookFilter () {
// function of return arr after filter and sort
  foundBooks = function () {
    let filteringBooks = localBooks().filter((elem) => {
      return (elem.title.toLowerCase().indexOf(inputSearch.value.toLowerCase()) !== -1 ||
       elem.author.firstName.toLowerCase().indexOf(inputSearch.value.toLowerCase()) !== -1 ||
       elem.author.lastName.toLowerCase().indexOf(inputSearch.value.toLowerCase()) !== -1) ? true : false;
    });
    return filteringBooks;
  };
// getting btn elems
  const btnAllBooks = document.querySelector('#btnAllBooks'),
    btnMostRecent = document.querySelector('#btnMostRecent'),
    btnMostPopular = document.querySelector('#btnMostPopular'),
    btnFreeBooks = document.querySelector('#btnFreeBooks'),
    inputSearch = document.querySelector('#inputSearch');
// add listeners
  btnAllBooks.addEventListener('click', allBooks);
  btnMostRecent.addEventListener('click', mostRecent);
  btnMostPopular.addEventListener('click', mostPopular);
  btnFreeBooks.addEventListener('click', freeBooks);
  inputSearch.addEventListener('keydown', () => {
    if (inputSearch.value.length > 0) {
      startDebounce();
    }
  });
// functions for listeners
  function allBooks () {
    inputSearch.value = '';
    activeBtn();
    renderBooks(localBooks().sort((elem1, elem2) => elem1.id - elem2.id));
    renderHistory('You are back to <b>All Books</b>.', new Date());
  }
  function mostRecent () {
    activeBtn();
    if (inputSearch.value === '') renderBooks(localBooks().sort((elem1, elem2) => elem2.updatedAt - elem1.updatedAt));
    else renderBooks(foundBooks().sort((elem1, elem2) => elem2.updatedAt - elem1.updatedAt));
    renderHistory('You have applied filter <b>Most Recent</b>.', new Date());
  }
  function mostPopular () {
    activeBtn();
    if (inputSearch.value === '') renderBooks(localBooks().sort((elem1, elem2) => elem2.rating - elem1.rating));
    else renderBooks(foundBooks().sort((elem1, elem2) => elem2.rating - elem1.rating));
    renderHistory('You have applied filter <b>Most Popular</b>.', new Date());
  }
  function freeBooks () {
    activeBtn();
    if (inputSearch.value === '') renderBooks(localBooks().filter((elem) => elem.cost === 0));
    else renderBooks(foundBooks().filter((elem) => elem.cost === 0));
    renderHistory('You have applied filter <b>Free Books</b>.', new Date());
  }
  function search () {
    renderBooks(foundBooks());
    if (inputSearch.value !== '') renderHistory(`You searched <b>"${inputSearch.value}"</b>.`, new Date());
  }
  function activeBtn () {
    let btns = [btnAllBooks, btnMostRecent, btnMostPopular, btnFreeBooks];
    for (let i = 0; i < btns.length; i++) {
      btns[i].className = '';
    }
    event.target.classList.add('main-container_nav_active');
  }
  function debounce(f, ms) {
    let delay = null;
    return function (...args) {
      const onComplete = function () {
        f.apply(this, args);
        delay = null;
      };
      if (delay) {
        clearTimeout(delay);
      };
      delay = setTimeout(onComplete, ms);
    };
  }
  let startDebounce = debounce(search, 500);
})();

// -------------------------------------
// --------------Dropmenu---------------
// -------------------------------------

(function loginMenu (){
  const btn = document.querySelector('.header-container_sign-in_title'),
    dropdown_menu = document.querySelector('.header-container_sign-in_menu');
// add listeners
  btn.addEventListener('click', () => {dropdown_menu.classList.toggle('header-container_sign-in_menu_dropmenu')});
  document.addEventListener('click', hideMenu);
// function for listener
  function hideMenu(e) {
    if (e.target === dropdown_menu || e.target === btn || dropdown_menu.contains(e.target)) return; 
    dropdown_menu.classList.remove('header-container_sign-in_menu_dropmenu');
  }
}());

// -------------------------------------
// --------------AddBook----------------
// -------------------------------------

(function addBook () {
// getting elements
  const btnStartAdd = document.querySelector('.sidebar-container_add_button'),
    btnAdd = document.querySelector('.sidebar-container_add_form-wrap_form_btns-wrap_btn-add'),
    btnClose = document.querySelector('.sidebar-container_add_form-wrap_form_btns-wrap_btn-close'),
    formAdd = document.querySelector('.sidebar-container_add_form-wrap'),
    inputBookTitle = document.querySelector('#bookTitle'),
    inputAuthorFirstName = document.querySelector('#authorFirstName'),
    inputAuthorLastName = document.querySelector('#authorLastName'),
    inputCost = document.querySelector('#bookCost'),
    selectBookCategories = document.querySelector('#bookCategories'),
    inputBookImg = document.querySelector('#bookImg');
// selected options of <select> input of 'add book' form
  let selectedOptionsArr = [];
  for (let i = 0; i < selectBookCategories.selectedOptions.length; i++) {
    selectedOptionsArr.push(selectBookCategories.selectedOptions[i].value);
  };
// add listeners
  btnStartAdd.addEventListener('click', activateForm);
  btnClose.addEventListener('click', disableForm);
  btnAdd.addEventListener('click', sendForm);
// functions for listeners
  function activateForm () {
    formAdd.classList.add('sidebar-container_add_form-wrap_active');
  }
  function disableForm () {
    formAdd.classList.remove('sidebar-container_add_form-wrap_active');
  }
  function sendForm () {
    let createTime = new Date(),
      newLocalBooks = localBooks(),
      newBook = {
        id: localBooks().length + 1,
        title: inputBookTitle.value,
        author: {
          firstName: inputAuthorFirstName.value,
          lastName: inputAuthorLastName.value
        },
        rating: 0,
        cost: +inputCost.value,
        categories: selectedOptionsArr,
        createdAt: createTime.getTime(),
        updatedAt: createTime.getTime(),
        image_url: inputBookImg.value
      };
    newLocalBooks.push(newBook);
    localStorage.setItem('BOOKS', JSON.stringify(newLocalBooks));
    renderBooks(localBooks());
    disableForm();
    renderHistory(`You added the new book <b>${inputBookTitle.value}</b> by <b>${inputAuthorFirstName.value}</b> <b>${inputAuthorLastName.value}</b> to site.`, new Date()); 
  }
})();

// -------------------------------------
// --------------History----------------
// -------------------------------------

class History {
  constructor () {
// getting elem
    this.wrap = document.querySelector('.sidebar-container_recent-actions');
// creating elems
    this.item = document.createElement('div');
    this.icon = document.createElement('i');
    this.actionInfo = document.createElement('p');
    this.actionTime = document.createElement('p');
// add css classes
    this.item.className = 'list-group';
    this.icon.className = 'fa fa-clock fa-fw';
// methods of history
    this.addActionOnPage = function () {
      this.wrap.insertBefore(this.item, this.wrap.firstChild);
      this.item.appendChild(this.icon);
      this.item.appendChild(this.actionInfo);
      this.item.appendChild(this.actionTime);
      if (this.wrap.children.length > 3) this.wrap.removeChild(this.wrap.lastChild);
    };
    this.currentActionInfo = function (text) {
      this.actionInfo.innerHTML = text;
    };
    this.currentActionTime = function (time) {
      let currentTime = new Date(),
      createTime = time;
      if (currentTime.getMinutes() - createTime.getMinutes() < 1) this.actionTime.innerHTML = 'Just now.';
      else if (currentTime.getMinutes() - createTime.getMinutes() >= 60) this.actionTime.innerHTML = `${(Math.floor(currentTime.getMinutes() - createTime.getMinutes())/60)} hour(s) ${currentTime.getMinutes() % createTime.getMinutes()} minute(s) ago.`;
      else this.actionTime.innerHTML = `${currentTime.getMinutes() - createTime.getMinutes()} minute(s) ago.`;
    };
  };
};

// -------------------------------------
// ----------History render-------------
// -------------------------------------

function localHistory () {
  let history;
  if (localStorage['HISTORY']) history = JSON.parse(localStorage['HISTORY']);
  else history = [];
  return history;
}

function renderHistory (text, time) {
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
// --------------Content----------------
// -------------------------------------

function renderBooks (arr) {
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
// start page loading
(function start () {
  renderBooks(localBooks());
  if (localHistory().length > 0) localHistory().forEach(history => renderHistory(history['text'], new Date(history['time'])));
  inputSearch.value = '';
})();
// -------------------------------------
// -----------Constructors--------------
// -------------------------------------

// book constructor
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
// saving book rating changes
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

// history constructor
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
// -----Start loading & local items-----
// -------------------------------------

// Getting books obj from server
function myFetch () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rsu-library-api.herokuapp.com/books', false);
  xhr.send();
  if (xhr.status === 200) return JSON.parse(xhr.responseText);
  else console.log(`Load books ERROR: ${xhr.status} : ${xhr.statusText}`);
};

// Upload data to localStorage
(function toLocalStorage () {
  if (!localStorage['BOOKS']) localStorage.setItem('BOOKS', JSON.stringify(myFetch()));
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

// -------------------------------------
// -----------Render elems--------------
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
// --------------Filter-----------------
// -------------------------------------
class Filter {
  constructor () {
// current book list
    this.booksToRender;
    this.searchedBooks;
    this.selectedCategory = [];
// check update of book list
    this.updateNewBookList = function (arr) {
      const result = [];
      arr.filter(book1 => {
        localBooks().forEach(book2 => {
          if (book1.id === book2.id) result.push(book2);
        });
      });
      return result;
    };
// filter
    this.filterFunc = function (e) {
      const category = e.target.dataset.value,
        name = e.target.dataset.name,
        btns = [btnAllBooks, btnMostRecent, btnMostPopular, btnFreeBooks];
      btns.forEach(btn => btn.className = '');
      if (e.target.classList.contains('sidebar-container_my-folders_active-btn')) this.selectedCategory.splice(this.selectedCategory.indexOf(category), 1);
      else this.selectedCategory.push(category);
      e.target.classList.toggle('sidebar-container_my-folders_active-btn');
// filter of select
      this.booksToRender = localBooks();
      // this.booksToRender = this.filterState();
      this.selectedCategory.forEach(cat => this.booksToRender = this.booksToRender.filter(book => book.categories.includes(cat)));
      inputSearch.value = '';
      renderBooks(this.updateNewBookList(this.booksToRender));
      renderHistory(`You have applied filter <b>${name}</b>.`, new Date());
      console.log(this.selectedCategory);
      console.log(this.booksToRender);
    };
// search
    this.searchFunc = function () {
      console.log(this.searchedBooks);
      console.log(this.booksToRender);
      if (!this.booksToRender) this.booksToRender = localBooks();
      this.searchedBooks = this.booksToRender.filter((elem) => {
        return (elem.title.toLowerCase().indexOf(inputSearch.value.toLowerCase()) !== -1 ||
          elem.author.firstName.toLowerCase().indexOf(inputSearch.value.toLowerCase()) !== -1 ||
          elem.author.lastName.toLowerCase().indexOf(inputSearch.value.toLowerCase()) !== -1) ? true : false;
      });
      (inputSearch.value === '') ? renderBooks(this.updateNewBookList(this.booksToRender)) : renderBooks(this.updateNewBookList(this.searchedBooks));
      if (inputSearch.value !== '') renderHistory(`You searched <b>"${inputSearch.value}"</b>.`, new Date());
    };
// search debounce
    this.debounce = function (f, ms) {
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
    };
    this.startDebounce = this.debounce(() => this.searchFunc(), 500);
// sort
    this.sortFunc = function (e) {
      const sortReason = e.target.dataset.value,
        sortName = e.target.dataset.name,
        btns = [btnAllBooks, btnMostRecent, btnMostPopular, btnFreeBooks];
      btns.forEach(btn => btn.className = '');
      e.target.classList.add('main-container_nav_active');
      if (!this.booksToRender) this.booksToRender = localBooks();
      if (e.target === btnFreeBooks) {
        console.log(this.booksToRender.filter(book => book[sortReason] === 0));
        (inputSearch.value === '') ?
        renderBooks(this.updateNewBookList(this.booksToRender).filter(book => book[sortReason] === 0)) :
        renderBooks(this.updateNewBookList(this.searchedBooks).filter(book => book[sortReason] === 0));
      } else {
        (inputSearch.value === '') ?
        renderBooks(this.updateNewBookList(this.booksToRender).sort((book1, book2) => book2[sortReason] - book1[sortReason])) :
        renderBooks(this.updateNewBookList(this.searchedBooks).sort((book1, book2) => book2[sortReason] - book1[sortReason]));
      };
      renderHistory(`You have applied sorting <b>${sortName}</b>.`, new Date());
    }
  };
};
class Lesteners extends Filter {
  constructor () {
    super();
// getting category btn elems
    this.btnMustReadTitles = document.querySelector('#btnMustReadTitles');
    this.btnBestOfList = document.querySelector('#btnBestOfList');
    this.btnClassicNovels = document.querySelector('#btnClassicNovels');
    this.btnNonFiction = document.querySelector('#btnNonFiction');
// getting search input
    this.inputSearch = document.querySelector('#inputSearch');
// getting filter btn elems
    this.btnAllBooks = document.querySelector('#btnAllBooks');
    this.btnMostRecent = document.querySelector('#btnMostRecent');
    this.btnMostPopular = document.querySelector('#btnMostPopular');
    this.btnFreeBooks = document.querySelector('#btnFreeBooks');
// add listeners for category btns
    this.btnMustReadTitles.addEventListener('click', (e) => this.filterFunc(e));
    this.btnBestOfList.addEventListener('click', (e) => this.filterFunc(e));
    this.btnClassicNovels.addEventListener('click', (e) => this.filterFunc(e));
    this.btnNonFiction.addEventListener('click', (e) => this.filterFunc(e));
// add listeners for search input
    this.inputSearch.addEventListener('keydown', () => this.startDebounce());
// add listeners for filter btns
    this.btnAllBooks.addEventListener('click', (e) => this.sortFunc(e));
    this.btnMostRecent.addEventListener('click', (e) => this.sortFunc(e));
    this.btnMostPopular.addEventListener('click', (e) => this.sortFunc(e));
    this.btnFreeBooks.addEventListener('click', (e) => this.sortFunc(e));
  };
};
// important for work
const fltr = new Lesteners();
console.log(fltr);
// (function BookFilter () {
// // function of return arr after filter and search
//   foundBooks = function () {
//     let filteringBooks = selectedCategory().filter((elem) => {
//       return (elem.title.toLowerCase().indexOf(inputSearch.value.toLowerCase()) !== -1 ||
//         elem.author.firstName.toLowerCase().indexOf(inputSearch.value.toLowerCase()) !== -1 ||
//         elem.author.lastName.toLowerCase().indexOf(inputSearch.value.toLowerCase()) !== -1) ? true : false;
//     });
//     if (inputSearch.value === '') return selectedCategory();
//     return filteringBooks;
//   };
// // current selected category
//   selectedCategory = () => localBooks();
// // getting filter btn elems
//   const btnAllBooks = document.querySelector('#btnAllBooks'),
//     btnMostRecent = document.querySelector('#btnMostRecent'),
//     btnMostPopular = document.querySelector('#btnMostPopular'),
//     btnFreeBooks = document.querySelector('#btnFreeBooks'),
// // getting search input
//     inputSearch = document.querySelector('#inputSearch'),
// // getting category btn elems
//     btnMustReadTitles = document.querySelector('#btnMustReadTitles'),
//     btnBestOfList = document.querySelector('#btnBestOfList'),
//     btnClassicNovels = document.querySelector('#btnClassicNovels'),
//     btnNonFiction = document.querySelector('#btnNonFiction');
// // add listeners for filter btns
//   btnAllBooks.addEventListener('click', allBooks);
//   btnMostRecent.addEventListener('click', mostRecent);
//   btnMostPopular.addEventListener('click', mostPopular);
//   btnFreeBooks.addEventListener('click', freeBooks);
// // add listeners for search input
//   inputSearch.addEventListener('keydown', () => {
//     if (inputSearch.value.length > 0) {
//       startDebounce();
//     };
//   });
// // add listeners for category btns
//   btnMustReadTitles.addEventListener('click', mustReadTitles);
//   btnBestOfList.addEventListener('click', bestOfList);
//   btnClassicNovels.addEventListener('click', classicNovels);
//   btnNonFiction.addEventListener('click', nonFiction);
// // state of btn
//   function activeFilterBtn () {
//     let btns = [btnAllBooks, btnMostRecent, btnMostPopular, btnFreeBooks];
//     for (let i = 0; i < btns.length; i++) {
//       btns[i].className = '';
//     }
//     event.target.classList.add('main-container_nav_active');
//   };
//   function activeCategoryBtn () {
//     let btns = [btnMustReadTitles, btnBestOfList, btnClassicNovels, btnNonFiction];
//     for (let i = 0; i < btns.length; i++) {
//       btns[i].className = '';
//     }
//     event.target.classList.add('sidebar-container_my-folders_active-btn');
//   };
// // functions for filter listeners
//   function allBooks () {
//     inputSearch.value = '';
//     activeFilterBtn();
//     renderBooks(selectedCategory().sort((elem1, elem2) => elem1.id - elem2.id));
//     renderHistory('You are back to <b>All Books</b>.', new Date());
//   };
//   function mostRecent () {
//     activeFilterBtn();
//     if (inputSearch.value === '') renderBooks(selectedCategory().sort((elem1, elem2) => elem2.updatedAt - elem1.updatedAt));
//     else renderBooks(foundBooks().sort((elem1, elem2) => elem2.updatedAt - elem1.updatedAt));
//     renderHistory('You have applied filter <b>Most Recent</b>.', new Date());
//   };
//   function mostPopular () {
//     activeFilterBtn();
//     if (inputSearch.value === '') renderBooks(selectedCategory().sort((elem1, elem2) => elem2.rating - elem1.rating));
//     else renderBooks(foundBooks().sort((elem1, elem2) => elem2.rating - elem1.rating));
//     renderHistory('You have applied filter <b>Most Popular</b>.', new Date());
//   };
//   function freeBooks () {
//     activeFilterBtn();
//     if (inputSearch.value === '') renderBooks(selectedCategory().filter((elem) => elem.cost === 0));
//     else renderBooks(foundBooks().filter((elem) => elem.cost === 0));
//     renderHistory('You have applied filter <b>Free Books</b>.', new Date());
//   };
// // functions for search listener
//   function search () {
//     renderBooks(foundBooks());
//     if (inputSearch.value !== '') renderHistory(`You searched <b>"${inputSearch.value}"</b>.`, new Date());
//   };
//   function debounce(f, ms) {
//     let delay = null;
//     return function (...args) {
//       const onComplete = function () {
//         f.apply(this, args);
//         delay = null;
//       };
//       if (delay) {
//         clearTimeout(delay);
//       };
//       delay = setTimeout(onComplete, ms);
//     };
//   };
//   let startDebounce = debounce(search, 500);
// // functions for category listeners
// function mustReadTitles () {
//   activeCategoryBtn();
//   selectedCategory = () => localBooks().filter(elem => {
//     return elem.categories.includes('must_read');
//   })
//   renderBooks(selectedCategory());
// };
// function bestOfList () {
//   activeCategoryBtn();
//   selectedCategory = () => localBooks().filter(elem => {
//     return elem.categories.includes('best');
//   })
//   renderBooks(selectedCategory());
// };
// function classicNovels () {
//   activeCategoryBtn();
//   selectedCategory = () => localBooks().filter(elem => {
//     return elem.categories.includes('classic_novels');
//   })
//   renderBooks(selectedCategory());
// };
// function nonFiction () {
//   activeCategoryBtn();
//   selectedCategory = () => localBooks().filter(elem => {
//     return elem.categories.includes('non_fiction');
//   })
//   renderBooks(selectedCategory());
// };
// })();


// -------------------------------------
// --------------AddBook----------------
// -------------------------------------
class AddBook {
  constructor () {
// selected options of <select> input of 'add book' form
    this.selectedCategories = function () {
      const result = [];
      for (let i = 0; i < this.selectBookCategories.selectedOptions.length; i++) {
        result.push(this.selectBookCategories.selectedOptions[i].value);
      };
      return result;
    };
// functions for listeners
    this.activateForm = function () {
      this.formAdd.classList.add('sidebar-container_add_form-wrap_active');
    };
    this.disableForm = function () {
      this.formAdd.classList.remove('sidebar-container_add_form-wrap_active');
    };
    this.sendForm = function () {
      const createTime = new Date(),
        newLocalBooks = localBooks(),
        newBook = {
          id: localBooks().length + 1,
          title: this.inputBookTitle.value,
          author: {
            firstName: this.inputAuthorFirstName.value,
            lastName: this.inputAuthorLastName.value
          },
          rating: 0,
          cost: +this.inputCost.value,
          categories: this.selectedCategories(),
          createdAt: createTime.getTime(),
          updatedAt: createTime.getTime(),
          image_url: this.inputBookImg.value
        };
      newLocalBooks.push(newBook);
      localStorage.setItem('BOOKS', JSON.stringify(newLocalBooks));
      renderBooks(localBooks());
      this.disableForm();
      renderHistory(`You added the new book <b>${this.inputBookTitle.value}</b> by <b>${this.inputAuthorFirstName.value}</b> <b>${this.inputAuthorLastName.value}</b> to site.`, new Date()); 
    };
  };
};

class AddBookController extends AddBook {
  constructor () {
    super();
// getting elements
    this.btnStartAdd = document.querySelector('.sidebar-container_add_button');
    this.btnAdd = document.querySelector('.sidebar-container_add_form-wrap_form_btns-wrap_btn-add');
    this.btnClose = document.querySelector('.sidebar-container_add_form-wrap_form_btns-wrap_btn-close');
    this.formAdd = document.querySelector('.sidebar-container_add_form-wrap');
    this.inputBookTitle = document.querySelector('#bookTitle');
    this.inputAuthorFirstName = document.querySelector('#authorFirstName');
    this.inputAuthorLastName = document.querySelector('#authorLastName');
    this.inputCost = document.querySelector('#bookCost');
    this.selectBookCategories = document.querySelector('#bookCategories');
    this.inputBookImg = document.querySelector('#bookImg');
// add listeners
    this.btnStartAdd.addEventListener('click', () => this.activateForm());
    this.btnClose.addEventListener('click', () => this.disableForm());
    this.btnAdd.addEventListener('click', () => this.sendForm());
  };
};

const addbook = new AddBookController();
// (function addBook () {
// // getting elements
//   const btnStartAdd = document.querySelector('.sidebar-container_add_button'),
//     btnAdd = document.querySelector('.sidebar-container_add_form-wrap_form_btns-wrap_btn-add'),
//     btnClose = document.querySelector('.sidebar-container_add_form-wrap_form_btns-wrap_btn-close'),
//     formAdd = document.querySelector('.sidebar-container_add_form-wrap'),
//     inputBookTitle = document.querySelector('#bookTitle'),
//     inputAuthorFirstName = document.querySelector('#authorFirstName'),
//     inputAuthorLastName = document.querySelector('#authorLastName'),
//     inputCost = document.querySelector('#bookCost'),
//     selectBookCategories = document.querySelector('#bookCategories'),
//     inputBookImg = document.querySelector('#bookImg');

// // add listeners
//   btnStartAdd.addEventListener('click', activateForm);
//   btnClose.addEventListener('click', disableForm);
//   btnAdd.addEventListener('click', sendForm);

// // selected options of <select> input of 'add book' form
//   function selectedCategories () {
//     const result = [];
//     for (let i = 0; i < selectBookCategories.selectedOptions.length; i++) {
//       result.push(selectBookCategories.selectedOptions[i].value);
//     };
//     return result;
//   };
// // functions for listeners
//   function activateForm () {
//     formAdd.classList.add('sidebar-container_add_form-wrap_active');
//   };
//   function disableForm () {
//     formAdd.classList.remove('sidebar-container_add_form-wrap_active');
//   };
//   function sendForm () {
//       const createTime = new Date(),
//       newLocalBooks = localBooks(),
//       newBook = {
//         id: localBooks().length + 1,
//         title: inputBookTitle.value,
//         author: {
//           firstName: inputAuthorFirstName.value,
//           lastName: inputAuthorLastName.value
//         },
//         rating: 0,
//         cost: +inputCost.value,
//         categories: selectedCategories(),
//         createdAt: createTime.getTime(),
//         updatedAt: createTime.getTime(),
//         image_url: inputBookImg.value
//       };
//     newLocalBooks.push(newBook);
//     localStorage.setItem('BOOKS', JSON.stringify(newLocalBooks));
//     renderBooks(localBooks());
//     disableForm();
//     renderHistory(`You added the new book <b>${inputBookTitle.value}</b> by <b>${inputAuthorFirstName.value}</b> <b>${inputAuthorLastName.value}</b> to site.`, new Date()); 
//   }
// })();

// -------------------------------------
// --------------Sign-in----------------
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
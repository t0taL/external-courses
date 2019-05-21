import {renderBooks, renderHistory} from './renderElems.js';
import {localBooks} from './localData.js';

// -------------------------------------
// --------------Filter-----------------
// -------------------------------------

export function BookFilter () {
  // function of return arr after filter and sort
    let foundBooks = function () {
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
  };
// -------------------------------------
// --------------Filter-----------------
// -------------------------------------

class FilterController extends Filter {
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

const filter = new FilterController;

// -------------------------------------
// --------------AddBook----------------
// -------------------------------------

class AddBookController extends AddBook {
  constructor () {
    super();
// getting elements
    this.btnStartAdd = document.querySelector('.sidebar-container__add__button');
    this.btnAdd = document.querySelector('#formAddButton');
    this.btnClose = document.querySelector('#formCloseButtton');
    this.formAdd = document.querySelector('.sidebar-container__add__form-wrap');
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

const addbook = new AddBookController;

// -------------------------------------
// --------------Sign-in----------------
// -------------------------------------

class SignInController extends SignIn {
  constructor () {
    super();
// getting elements
    this.btn = document.querySelector('.header-container__sign-in__title');
    this.dropdown_menu = document.querySelector('.header-container__sign-in__menu');
// add listeners
    this.btn.addEventListener('click', () => {this.dropdown_menu.classList.toggle('header-container__sign-in__menu__dropmenu')});
    document.addEventListener('click', (e) => this.hideMenu(e));
  };
};

const signIn = new SignInController;
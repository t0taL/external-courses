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

const filter = new FilterController();

// -------------------------------------
// --------------AddBook----------------
// -------------------------------------

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
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
// reset current filter
    this.resetFilter = function () {
      const buttons = [btnAllBooks, btnMostRecent, btnMostPopular, btnFreeBooks];
      buttons.forEach(btn => btn.className = '');
    }
// filter
    this.filterFunc = function (e) {
      const category = e.target.dataset.value,
        name = e.target.dataset.name;
      this.resetFilter();
      if (e.target.classList.contains('sidebar-container__my-folders__active-btn')) this.selectedCategory.splice(this.selectedCategory.indexOf(category), 1);
      else this.selectedCategory.push(category);
      e.target.classList.toggle('sidebar-container__my-folders__active-btn');
// filter of select
      this.booksToRender = localBooks();
      this.selectedCategory.forEach(cat => this.booksToRender = this.booksToRender.filter(book => book.categories.includes(cat)));
      inputSearch.value = '';
      renderBooks(this.updateNewBookList(this.booksToRender));
      (e.target.classList.contains('sidebar-container__my-folders__active-btn')) ?
      renderHistory(`You applied the filter <b>${name}</b>.`, new Date()) :
      renderHistory(`You canceled the filter <b>${name}</b>.`, new Date());
    };
// search
    this.searchFunc = function () {
      const searchValue = inputSearch.value.toLowerCase();
      this.resetFilter();
      if (!this.booksToRender) this.booksToRender = localBooks();
      this.searchedBooks = this.booksToRender.filter((elem) => {
        return (elem.title.toLowerCase().indexOf(searchValue) !== -1 ||
          elem.author.firstName.toLowerCase().indexOf(searchValue) !== -1 ||
          elem.author.lastName.toLowerCase().indexOf(searchValue) !== -1);
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
        sortName = e.target.dataset.name;
        this.resetFilter();
      e.target.classList.add('main-container__nav__active');
      if (!this.booksToRender) this.booksToRender = localBooks();
      if (e.target === btnAllBooks) inputSearch.value = '';
      if (e.target === btnFreeBooks) {
        (inputSearch.value === '') ?
        renderBooks(this.updateNewBookList(this.booksToRender).filter(book => book[sortReason] === 0)) :
        renderBooks(this.updateNewBookList(this.searchedBooks).filter(book => book[sortReason] === 0));
      } else {
        (inputSearch.value === '') ?
        renderBooks(this.updateNewBookList(this.booksToRender).sort((book1, book2) => book2[sortReason] - book1[sortReason])) :
        renderBooks(this.updateNewBookList(this.searchedBooks).sort((book1, book2) => book2[sortReason] - book1[sortReason]));
      };
      renderHistory(`You applied the sorting <b>${sortName}</b>.`, new Date());
    };
  };
};
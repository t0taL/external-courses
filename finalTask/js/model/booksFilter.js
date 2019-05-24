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
      this.selectedCategory.forEach(cat => this.booksToRender = this.booksToRender.filter(book => book.categories.includes(cat)));
      inputSearch.value = '';
      renderBooks(this.updateNewBookList(this.booksToRender));
      renderHistory(`You have applied filter <b>${name}</b>.`, new Date());
    };
// search
    this.searchFunc = function () {
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
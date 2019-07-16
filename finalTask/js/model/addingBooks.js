// -------------------------------------
// --------------AddBook----------------
// -------------------------------------

class AddBook {
  constructor () {
// selected options of <select> input of 'add book' form
    this.selectedCategories = function () {
      let result = [];
      for (let i = 0; i < this.selectBookCategories.selectedOptions.length; i++) {
        result.push(this.selectBookCategories.selectedOptions[i].value);
      };
      return result;
    };
// functions for listeners
    this.activateForm = function () {
      this.formAdd.classList.add('sidebar-container__add__form-wrap__active');
    };
    this.disableForm = function () {
      this.formAdd.classList.remove('sidebar-container__add__form-wrap__active');
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
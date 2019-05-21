import {localBooks} from './localData.js';
import {renderBooks, renderHistory} from './renderElems.js';

export function addBook () {
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
  };
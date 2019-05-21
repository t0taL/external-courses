import {myFetch} from './myFetch.js';
import {start} from './renderElems.js';
import {BookFilter} from './filter.js';
import {loginMenu} from './additionalFuncs.js';
import {addBook} from './addBook.js';


// filling localStorage
if (!localStorage['BOOKS']) localStorage.setItem('BOOKS', JSON.stringify(myFetch()));
// rendering start page
start();
// add filter function on page
BookFilter();
// add dropMenu of SignIn on page
loginMenu();
// add 'addBook' function on page
addBook();
// -------------------------------------
// -----------Constructors--------------
// -------------------------------------

// book constructor
class Book {
  constructor () {
// getting elem
    this.wrap = document.querySelector('.main-container__content');
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
    this.item.className = 'main-container__content__item';
    this.rating.className = 'main-container__content__item__rating';
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
        if (i < rating - 1) this.stars[i].className = 'fas fa-star main-container__content__item__rating__star';
        else if (i == rating - 1 || i == rating - 0.5) {
          if ((rating ^ 0) == rating) this.stars[i].className = 'fas fa-star main-container__content__item__rating__star';
          else this.stars[i].className = 'fas fa-star-half-alt main-container__content__item__rating__star';
        }
        else this.stars[i].className = 'far fa-star main-container__content__item__rating__star';
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
          if (e.pageX > e.target.offsetLeft + 8) this.stars[i].className = 'fas fa-star main-container__content__item__rating__star';
          else this.stars[i].className = 'fas fa-star-half-alt main-container__content__item__rating__star';
        }
        else if (this.rating === e.target.parentNode) this.stars[i].className = 'fas fa-star main-container__content__item__rating__star';
        else break;
      }
      for (let j = 4; j >= 0; j--) {
        if (this.rating === e.target.parentNode && this.stars[j] !== e.target) this.stars[j].className = 'far fa-star main-container__content__item__rating__star';
        else break;
      }
    }
    this.returnRating = function (e) {
      const targetBookRating = localBooks()[e.target.parentNode.parentNode.id - 1].rating;
      for (let i = 0; i < 5; i++) {
        if (i < targetBookRating - 1) this.stars[i].className = 'fas fa-star main-container__content__item__rating__star';
        else if (i == targetBookRating - 1 || i == targetBookRating - 0.5) {
          if ((targetBookRating ^ 0) == targetBookRating) this.stars[i].className = 'fas fa-star main-container__content__item__rating__star';
          else this.stars[i].className = 'fas fa-star-half-alt main-container__content__item__rating__star';
        }
        else this.stars[i].className = 'far fa-star main-container__content__item__rating__star';
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
// adding elems on page
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
    this.wrap = document.querySelector('.sidebar-container__recent-actions');
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
    this.updateHistoryTime = function () {
      this.item.appendChild(this.actionTime);
    };
  };
};
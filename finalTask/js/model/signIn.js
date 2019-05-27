// -------------------------------------
// --------------Sign-in----------------
// -------------------------------------

class SignIn {
  constructor () {
    this.hideMenu = function (e) {
      if (e.target === this.dropdown_menu || e.target === this.btn || this.dropdown_menu.contains(e.target)) return; 
      this.dropdown_menu.classList.remove('header-container__sign-in__menu__dropmenu');
    };
  };
};
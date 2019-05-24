// -------------------------------------
// --------------Sign-in----------------
// -------------------------------------

(function loginMenu (){
  const btn = document.querySelector('.header-container_sign-in_title'),
    dropdown_menu = document.querySelector('.header-container_sign-in_menu');
// add listeners
  btn.addEventListener('click', () => {dropdown_menu.classList.toggle('header-container_sign-in_menu_dropmenu')});
  document.addEventListener('click', hideMenu);
// function for listener
  function hideMenu(e) {
    if (e.target === dropdown_menu || e.target === btn || dropdown_menu.contains(e.target)) return; 
    dropdown_menu.classList.remove('header-container_sign-in_menu_dropmenu');
  }
}());
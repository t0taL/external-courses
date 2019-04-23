const BTN = document.getElementById('sign-in'),
      DROPDOWN_MENU = document.getElementById('menu');

BTN.addEventListener('click', () => {DROPDOWN_MENU.classList.add('dropdown-menu')});
document.addEventListener('click', hideMenu);

function hideMenu() {
  if (event.target === DROPDOWN_MENU || event.target === BTN || DROPDOWN_MENU.contains(event.target)) return; 
  DROPDOWN_MENU.classList.remove('dropdown-menu');
}
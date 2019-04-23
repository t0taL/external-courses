function prepend(container, newElem) {
  let count = 4;
  return function() {
    if (count < 10) {
      const NEW_ELEM = document.createElement(newElem),
      CONTAINER = document.getElementById(container);
      NEW_ELEM.className = 'primary-items-new';
      NEW_ELEM.innerHTML = count;
      CONTAINER.insertBefore(NEW_ELEM, CONTAINER.firstChild);
      return count++;
    } else alert('Enough!');
  };
};

const PREPEND = prepend('main-container', 'div');

const BTN = document.getElementById('activate');
BTN.addEventListener('click', PREPEND);
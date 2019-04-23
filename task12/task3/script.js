const STAR_1 = document.getElementById('star_1'),
      STAR_2 = document.getElementById('star_2'),
      STAR_3 = document.getElementById('star_3'),
      STAR_4 = document.getElementById('star_4'),
      STAR_5 = document.getElementById('star_5'),
      STARS = [STAR_1, STAR_2, STAR_3, STAR_4, STAR_5];

for (let i = 0; i < STARS.length; i++) {
  STARS[i].addEventListener('click', changeRaiting);
}

function changeRaiting() {
  for (let i = 0; i < STARS.length; i++) {
    if (i < STARS.indexOf(event.target)) STARS[i].className = 'raiting_red';
    else if (i > STARS.indexOf(event.target)) STARS[i].classList.remove('raiting_red', 'raiting_red-black');
  }
  if (event.target.classList.contains('raiting_red-black')) event.target.className = 'raiting_red';
  else if (event.target.classList.contains('raiting_red')) event.target.classList.remove('raiting_red');
  else event.target.className = 'raiting_red-black';
}
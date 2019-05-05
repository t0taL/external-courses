const STAR_1 = document.getElementById('star_1'),
      STAR_2 = document.getElementById('star_2'),
      STAR_3 = document.getElementById('star_3'),
      STAR_4 = document.getElementById('star_4'),
      STAR_5 = document.getElementById('star_5'),
      STARS = [STAR_1, STAR_2, STAR_3, STAR_4, STAR_5];

for (let i = 0; i < STARS.length; i++) {
  STARS[i].addEventListener('click', changeRating);
}

function changeRating() {
  for (let i = 0; i < STARS.length; i++) {
    if (i < STARS.indexOf(event.target)) STARS[i].className = 'rating_red';
    else if (i > STARS.indexOf(event.target)) STARS[i].classList.remove('rating_red', 'rating_red-black');
  }
  if (event.target.classList.contains('rating_red-black')) event.target.className = 'rating_red';
  else if (event.target.classList.contains('rating_red')) event.target.classList.remove('rating_red');
  else event.target.className = 'rating_red-black';
}
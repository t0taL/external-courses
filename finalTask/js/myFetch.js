// Getting books obj from server
export function myFetch () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rsu-library-api.herokuapp.com/books', false);
  xhr.send();
  if (xhr.status === 200) return JSON.parse(xhr.responseText);
  else console.log(`Load books ERROR: ${xhr.status} : ${xhr.statusText}`);
};
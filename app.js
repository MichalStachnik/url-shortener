// Returns an HTML collection so we must destructure
const [form] = document.getElementsByTagName('form');

const showButton = document.getElementById('show');

form.addEventListener('submit', evt => {
  const url = document.getElementById('url').value;
  evt.preventDefault();

  // Generate a shortened URL
  const shortenedUrl = genUrl();

  localStorage.setItem(url, shortenedUrl);
});

// Generate a random url
const genUrl = () => {
  // Arbitrary new url
  let short = `https://tiny.com/`;
  // Run random generation 7 times as per tinyurl.com
  for (let i = 0; i < 7; i++) {
    const min = 48; // Unicode 0
    const max = 123; // Unicode z

    // Get random number from range
    const randomNum = Math.floor(Math.random() * (max - min) + min);
    // Get a character from random number
    const randomChar = String.fromCharCode(randomNum);
    // Add on to our url
    short = `${short}${randomChar}`;
  }

  return short;
};

showButton.addEventListener('click', () => {
  const localStorageKeys = Object.keys(localStorage);

  // Add markup
  const ul = document.getElementById('urls');

  localStorageKeys.forEach(key => {
    let li = document.createElement('li');
    li.className =
      'list-group-item d-flex justify-content-between align-items-center';

    let p = document.createElement('p');
    p.innerText = `${key}`;

    let a = document.createElement('a');
    a.innerText = `${localStorage.getItem(key)}`;
    a.setAttribute('href', `${key}`);

    li.appendChild(p);
    li.appendChild(a);
    ul.appendChild(li);
  });
});

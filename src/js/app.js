const { auth, firestore } = require('./firebase-helper');

const ui = require('./ui');
const handlers = require('./event-handlers');

auth.onAuthStateChanged(function checkUser(user) {
  if (user) {
    document.body.style.display = 'block';
    ui.searchSection.style.display = 'block';
    ui.loginSection.style.display = 'none';
  } else {
    document.body.style.display = 'block';
    ui.searchSection.style.display = 'none';
    ui.loginSection.style.display = 'block';
  }
});

ui.searchButton.addEventListener('click', handlers.searchHandler);
ui.loginButton.addEventListener('click', handlers.login);

// Delegated events
document.addEventListener('click', handlers.createSubscription);

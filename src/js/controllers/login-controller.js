const app = document.querySelector('#app');

function LoginController() {}

LoginController.prototype.logout = function(event) {
  firebase.auth().signOut();
  event.preventDefault();
};

LoginController.prototype.login = function(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => console.log('Logged in'))
    .catch(err => console.error(err.message));
};

LoginController.prototype.show = function() {
  const loginView = require('../views/login-view');
  app.innerHTML = loginView();
};

module.exports = LoginController;

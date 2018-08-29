const app = document.querySelector('#app');

function LoginController() {
  // UI Elements
  this.loginSection = document.querySelector('#login');
  this.loginButton = document.querySelector('#login_button');
  this.email = document.querySelector('#email');
  this.password = document.querySelector('#password');
}

LoginController.logout = function(event) {
  firebase.auth().signOut();
  event.preventDefault();
};

LoginController.login = function(event) {
  var email = this.email.value;
  var password = this.password.value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => console.error(err.message));

  event.preventDefault();
};

LoginController.prototype.show = function(context) {
  const loginView = require('../views/login-view');
  app.innerHTML = loginView();
};

module.exports = LoginController;

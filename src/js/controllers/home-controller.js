const homeView = require('../views/home-view');
const app = document.querySelector('#app');

function HomeController() {}

HomeController.prototype.show = function(context) {
  let home = homeView(context);
  app.innerHTML = home;
};

module.exports = HomeController;

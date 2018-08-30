const homeView = require('../views/home-view');
const app = document.querySelector('#app');

function HomeController() {}

HomeController.prototype.show = function() {
  firebase
    .firestore()
    .collection('subscriptions')
    .orderBy('showSlug')
    .get()
    .then(docSnapshots => {
      let docs = [];
      docSnapshots.forEach(doc => {
        let singleDoc = doc.data();
        singleDoc.id = doc.id;
        docs.push(singleDoc);
      });
      return docs;
    })
    .then(docs => {
      let home = homeView(docs);
      app.innerHTML = home;
      return;
    })
    .catch(err => console.error(err.message));
};

module.exports = HomeController;

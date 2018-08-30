const htmlparser = require('htmlparser');
const { subscriptionMetaView } = require('../views/subscription-view');
const app = document.querySelector('#app');

function SubscriptionController() {}

SubscriptionController.prototype.subscribe = function(showObj) {
  firebase
    .firestore()
    .collection('subscriptions')
    .add(showObj)
    .then(docRef =>
      console.log(`Subscribed to ${showObj.showTitle} at id: ${docRef.id}`)
    )
    .catch(err => console.error(err.message));
};

SubscriptionController.prototype.unsubscribe = function(showId) {
  firebase
    .firestore()
    .collection('subscriptions')
    .doc(showId)
    .delete()
    .then(() => console.log('Unsubscribed'))
    .catch(err => console.error(err.message));
};

SubscriptionController.prototype.show = function(context) {
  app.innerHTML = '';
  firebase
    .firestore()
    .collection('subscriptions')
    .where('showSlug', '==', context.params.showSlug)
    .get()
    .then(docSnapshot => {
      docSnapshot.forEach(doc => {
        app.innerHTML += subscriptionMetaView(doc.data());
        console.log(doc.data().feedUrl);
        SubscriptionController.parseFeed(doc.data().feedUrl);
      });
      return;
    })
    .catch(err => console.error(err.message));
};

SubscriptionController.parseFeed = function(feedUrl) {
  fetch(feedUrl, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Upgrade-Insecure-Requests': 1,
    },
    mode: 'cors',
  })
    .then(results => results.text())
    .then(doc => console.log(doc))
    .catch(err => console.error(err.message));
  /* const parser = new htmlparser.RssHandler((err, dom) => {

  }); */
};

module.exports = SubscriptionController;

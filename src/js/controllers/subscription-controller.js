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
    .then(docSnapshots => {
      docSnapshots.forEach(doc => {
        app.innerHTML += subscriptionMetaView(doc);
      });
      return;
    })
    .catch(err => console.error(err.message));
};

SubscriptionController.prototype.refreshFeed = function(showId) {
  const endpoint = `https://us-central1-podbop-60152.cloudfunctions.net/updateFeed?id=${showId}`;

  return fetch(endpoint)
    .then(res => console.log(res.text()))
    .catch(err => console.error(err));
};

module.exports = SubscriptionController;

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });

const feedparser = require('feedparser-promised');

exports.savingFeedItems = functions.firestore
  .document('/subscriptions/{documentId}')
  .onCreate(function saveFeedItems(snapshot, context) {
    const feedUrl = snapshot.data().feedUrl;
    feedparser
      .parse(feedUrl)
      .then(items => {
        return items.splice(0, 5).map(item => {
          let itemObj = {
            title: item.title,
            link: item.link,
            mediaUrl: item.enclosures[0].url,
            mediaLength: item.enclosures[0].length,
          };
          return itemObj;
        });
      })
      .then(items => {
        return items.forEach(item => {
          admin
            .firestore()
            .collection('subscriptions')
            .doc(snapshot.id)
            .collection('feed_items')
            .add(item);
        });
      })
      .then(() => console.log('Feed added'))
      .catch(err => console.log(err.message));
  });

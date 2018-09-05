const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });

const feedparser = require('feedparser-promised');

exports.savingFeedItems = functions.firestore
  .document('/subscriptions/{documentId}')
  .onCreate(function saveFeedItems(snapshot, context) {
    const feedUrl = snapshot.data().feedUrl;

    return feedparser
      .parse(feedUrl)
      .then(results => {
        const feed = {};
        const items = results.slice(0, 5).map(result => {
          let itemObj = {};
          itemObj.title = result.title;
          itemObj.link = result.link;
          itemObj.mediaUrl = result.enclosures[0].url;
          itemObj.mediaLength = result.enclosures[0].length;
          return itemObj;
        });

        feed.meta = results[0].meta;
        feed.items = items;
        return feed;
      })
      .then(feed => {
        return admin
          .firestore()
          .collection('subscriptions')
          .doc(snapshot.id)
          .set(
            {
              feedItems: feed.items,
              showUrl: feed.meta.link,
            },
            { merge: true }
          );
      })
      .then(() => console.log('Feed added'))
      .catch(err => console.log(err.message));
  });

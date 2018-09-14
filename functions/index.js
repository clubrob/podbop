const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });

const feedparser = require('feedparser-promised');

function prepareFeedResults(resultsArray) {
  const feed = {};
  const items = resultsArray.slice(0, 5).map(result => {
    let itemObj = {};
    itemObj.title = result.title;
    itemObj.link = result.link;
    itemObj.mediaUrl = result.enclosures[0].url;
    itemObj.mediaLength = result.enclosures[0].length;
    return itemObj;
  });

  feed.meta = resultsArray[0].meta;
  feed.items = items;
  return feed;
}

function saveFeedItems(id, collection, feedObject) {
  return admin
    .firestore()
    .collection(collection)
    .doc(id)
    .set(
      {
        feedItems: feedObject.items,
        showUrl: feed.meta.link,
      },
      { merge: true }
    );
}

function updateFeedItems(id, collection, feedObject) {
  return admin
    .firestore()
    .collection(collection)
    .doc(id)
    .update({
      feedItems: feedObject.items,
    });
}

exports.savingFeedItems = functions.firestore
  .document('/subscriptions/{documentId}')
  .onCreate(function saveFeed(snapshot) {
    const feedUrl = snapshot.data().feedUrl;

    return feedparser
      .parse(feedUrl)
      .then(results => prepareFeedResults(results))
      .then(feedObject =>
        saveFeedItems(snapshot.id, 'subscriptions', feedObject)
      )
      .then(() => console.log('Feed added'))
      .catch(err => console.log(err.message));
  });

exports.updateFeed = functions.https.onRequest((req, res) => {
  if (req.method !== 'GET') {
    return res.status(403).send('Forbidden!');
  }
  const id = req.query.id;
  const collection = 'subscriptions';

  return admin
    .firestore()
    .collection(collection)
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data().feedUrl;
      } else {
        return res.sendStatus(404);
      }
    })
    .then(feedUrl => feedparser.parse(feedUrl))
    .then(results => prepareFeedResults(results))
    .then(feedObject => updateFeedItems(id, collection, feedObject))
    .then(() => res.send('updated'))
    .catch(err => console.error(err.message));
});

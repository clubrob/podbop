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

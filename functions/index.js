const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });

const FeedMe = require('feedme');
const rp = require('request-promise');

exports.parsingFeed = functions.firestore
  .document('/subscriptions/{documentId}')
  .onCreate(function parse(snapshot, context) {
    const feedUrl = snapshot.data().feedUrl;
    return rp(feedUrl)
      .then(feed => {
        const parser = new FeedMe();
        feed.pipe(parser);
        parser.on('end', () => {
          return parser.done();
        })
      })
      .then(json => {
        console.log(json);
        // console.log('Updating... ', context.params.documentId);
        /* return snapshot.ref.set(
          {
            title: clipProps.title,
            summary: clipProps.summary,
            slug: clipProps.slug,
          },
          { merge: true }
        ); */
      })
      .then(res => console.log('Added additional properties: ', res))
      .catch(err => console.error(err.message));
  });
const firebase = require('firebase/app');
require('firebase/storage');
require('firebase/firestore');
require('firebase/auth');

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: process.env.FIREBASE_DB_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(firebaseConfig);
window.firebase = firebase;
const firestoreConfig = { timestampsInSnapshots: true };
firestore.settings(firestoreConfig);

const fbase = {
  firestore: firebase.firestore(),
  auth: firebase.auth(),
};

module.exports = fbase;

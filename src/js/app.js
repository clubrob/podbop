const firebase = require('firebase/app');
require('firebase/storage');
require('firebase/firestore');
require('firebase/auth');
const page = require('page');

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: process.env.FIREBASE_DB_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(firebaseConfig);
window.firebase = firebase;

const auth = firebase.auth();
const firestore = firebase.firestore();
const firestoreConfig = { timestampsInSnapshots: true };
firestore.settings(firestoreConfig);

console.log(auth.currentUser);

// Controllers
const HomeController = require('./controllers/home-controller');
const LoginController = require('./controllers/login-controller');
/* const SubscriptionController = require('./controllers/subscription-controller');
const EpisodeController = require('./controllers/episode-controller');
const PlaylistController = require('./controllers/playlist-controller');
const SearchController = require('./controllers/search-controller'); */

const Home = new HomeController();
const Login = new LoginController();
/* const Subscription = new SubscriptionController();
const Episode = new EpisodeController();
const Playlist = new PlaylistController();
const Search = new SearchController(); */

// const handlers = require('./event-handlers');

// Hide content before auth check
/* document.body.style.display = 'none';

auth.onAuthStateChanged(function checkUser(user) {
  if (user) {
    document.body.style.display = 'block';
    ui.searchSection.style.display = 'block';
    ui.loginSection.style.display = 'none';
  } else {
    document.body.style.display = 'block';
    ui.searchSection.style.display = 'none';
    ui.loginSection.style.display = 'block';
  }
}); */

function router() {
  page('/', Home.show);
  page('/login', Login.show);
  /* page('/:showSlug', show.load, show.show);
  page('/:showSlug/:episodeSlug', episode.load, episode.show);
  page('/playlist/:playlistSlug', playlist.load, playlist.show);
  page('/search', search.load, search.show); */
  page('*', () => page('/'));
  page();
}

// Global events
function toggleMobileMenu() {
  const navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-burger'),
    0
  );
  if (navbarBurgers.length > 0) {
    navbarBurgers.forEach(burger => {
      burger.addEventListener('click', () => {
        const target = burger.dataset.target;
        const menu = document.querySelector(`#${target}`);
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', router);
document.addEventListener('DOMContentLoaded', toggleMobileMenu);

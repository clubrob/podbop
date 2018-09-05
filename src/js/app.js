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

auth.onAuthStateChanged(function checkUser(user) {
  if (user) {
    // console.log(auth.currentUser);
  }
});

// Controllers
const HomeController = require('./controllers/home-controller');
const LoginController = require('./controllers/login-controller');
const SubscriptionController = require('./controllers/subscription-controller');
/* const EpisodeController = require('./controllers/episode-controller');
const PlaylistController = require('./controllers/playlist-controller');
*/
const SearchController = require('./controllers/search-controller');

const Home = new HomeController();
const Login = new LoginController();
const Subscription = new SubscriptionController();
/* const Episode = new EpisodeController();
const Playlist = new PlaylistController();
*/
const Search = new SearchController();

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
  page('/login', Login.show);
  page('/', Home.show);
  page('/search', Search.show);
  /* page('/:showSlug/:episodeSlug', episode.load, episode.show);
  page('/playlist/:playlistSlug', playlist.load, playlist.show);
  */
  page('/:showSlug', Subscription.show);
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
      const target = burger.dataset.target;
      const menu = document.querySelector(`#${target}`);
      document.addEventListener('click', event => {
        if (event.target === burger) {
          burger.classList.toggle('is-active');
          menu.classList.toggle('is-active');
        } else {
          burger.classList.remove('is-active');
          menu.classList.remove('is-active');
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', router);
document.addEventListener('DOMContentLoaded', toggleMobileMenu);
document.addEventListener('click', event => {
  const button = event.target;
  if (button && button.matches('#login_button')) {
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    Login.login(email, password);
    event.preventDefault();
  }
});
document.addEventListener('click', event => {
  const button = event.target;
  if (button && button.matches('#search_button')) {
    let term = document.querySelector('#search_term').value;
    Search.runSearch(term);
    event.preventDefault();
  }
});
document.addEventListener('click', event => {
  const button = event.target;
  if (button && button.matches('.subscribe_button')) {
    const show = {
      feedUrl: button.dataset.feedUrl,
      showImageUrl: button.dataset.showImageUrl,
      showTitle: button.dataset.showTitle,
      showSlug: button.dataset.showSlug,
      created_at: Date.now(),
    };
    Subscription.subscribe(show);
    event.preventDefault();
  }
});
document.addEventListener('click', event => {
  const button = event.target;
  if (button && button.matches('.unsubscribe_button')) {
    const showId = button.dataset.id;
    Subscription.unsubscribe(showId);
    event.preventDefault();
  }
});

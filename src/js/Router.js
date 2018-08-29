const firebase = require('firebase/app');
require('firebase/auth');
const page = require('page');

function Router(auth) {
  this.auth = auth;

  // Dom elements.
  /* this.pagesElements = $('[id^=page-]');
  this.splashLogin = $('#login', '#page-splash'); */

  // Make sure /add is never opened on website load.
  if (window.location.pathname === '/add') {
    page('/');
  }

  // Configuring routes.
  const pipe = Router.pipe;
  const displayPage = this.displayPage.bind(this);

  /* page('/', pipe(showHomeFeed, null, true), pipe(displayPage, {pageId: 'feed', onlyAuthed: true}));
  page('/feed', pipe(showGeneralFeed, null, true), pipe(displayPage, {pageId: 'feed'}));
  page('/post/:postId', pipe(showPost, null, true), pipe(displayPage, {pageId: 'post'}));
  page('/user/:userId', pipe(loadUser, null, true), pipe(displayPage, {pageId: 'user-info'}));
  page('/about', pipe(clearFeed, null, true), pipe(displayPage, {pageId: 'about'}));
  page('/terms', pipe(clearFeed, null, true), pipe(displayPage, {pageId: 'terms'}));
  page('/add', pipe(displayPage, {pageId: 'add', onlyAuthed: true})); */
  page('*', () => page('/'));

  // Start routing.
  page();
}

Router.prototype.displayPage = function(attributes, context) {
  const onlyAuthed = attributes.onlyAuthed;

  if (onlyAuthed) {
    // If the page can only be displayed if the user is authenticated then we wait or the auth state.
    this.auth.waitForAuth.then(() => {
      this._displayPage(attributes, context);
    });
  } else {
    this._displayPage(attributes, context);
  }
};

Router.prototype._displayPage = function(attributes, context) {
  const onlyAuthed = attributes.onlyAuthed;
  let pageId = attributes.pageId;

  if (onlyAuthed && !firebase.auth().currentUser) {
    pageId = '/';
  }
  this.pagesElements.each(function(index, element) {
    if (element.id === 'page-' + pageId) {
      $(element).show();
    } else if (element.id === 'page-splash' && onlyAuthed) {
      $(element).fadeOut(1000);
    } else {
      $(element).hide();
    }
  });
};

Router.reloadPage = function() {
  let path = window.location.pathname;
  if (path === '') {
    path = '/';
  }
  page(path);
};

/**
 * Pipes the given function and passes the given attribute and Page.js context.
 * Set 'optContinue' to true if there are further functions to call.
 */
Router.pipe = function(fn, attribute, optContinue) {
  return (context, next) => {
    if (fn) {
      const params = Object.keys(context.params);
      if (!attribute && params.length > 0) {
        fn(context.params[params[0]], context);
      } else {
        fn(attribute, context);
      }
    }
    if (optContinue) {
      next();
    }
  };
};

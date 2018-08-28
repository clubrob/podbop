const ui = require('./ui');
const slugify = require('slugify');

const eventHandlers = {
  logout: function(event) {
    firebase.auth().signOut();
    event.preventDefault();
  },

  login: function(event) {
    var email = ui.email.value;
    var password = ui.password.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => console.error(err.message));

    event.preventDefault();
  },

  searchHandler: function(event) {
    const term = ui.searchTerm.value;

    fetch(`https://itunes.apple.com/search?term=${term}`)
      .then(results => results.json())
      .then(results => {
        let list = document.querySelector('#result_cards');
        list.innerHTML = '';
        return results.results.forEach(result => {
          if (result.kind === 'podcast') {
            let podData = {
              feedUrl: result.feedUrl,
              showTitle: result.collectionName,
              showImageUrl: result.artworkUrl600,
              showSlug: slugify(result.collectionName.toLowerCase()),
            };

            list.innerHTML += `
                <div class="card">
                  <div class="card-image">
                    <img src="${podData.showImageUrl}">
                  </div>
                  <div class="card-content">
                    <h4 class="subtitle is-4">
                      ${result.collectionName}
                    </h4>
                    <button 
                    class="button is-success subscribe_button"
                    data-feed-url="${podData.feedUrl}"
                    data-show-title="${podData.showTitle}"
                    data-show-slug="${podData.showSlug}"
                    data-show-image-url="${podData.showImageUrl}"
                    >
                    Subscribe
                    </button>
                  </div>
                </div>
              `;
          }
        });
      })
      .catch(err => console.error(err.message));

    event.preventDefault();
  },

  createSubscription: function(event) {
    const button = event.target;
    if (button && button.matches('.subscribe_button')) {
      const show = {
        feedUrl: button.dataset.feedUrl,
        showImageUrl: button.dataset.showImageUrl,
        showTitle: button.dataset.showTitle,
        showSlug: button.dataset.showSlug,
        created_at: Date.now(),
      };
      /* console.log(show);
      console.log(button.dataset); */
      firebase
        .firestore()
        .collection('subscriptions')
        .add(show)
        .then(docRef =>
          console.log(`Subscribed to ${show.showTitle} at id: ${docRef.id}`)
        )
        .catch(err => console.error(err.message));

      event.preventDefault();
    }
  },
};

module.exports = eventHandlers;

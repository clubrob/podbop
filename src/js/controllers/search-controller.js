const slugify = require('slugify');
const { searchFormView, searchResultsView } = require('../views/search-view');

function SearchController() {}

SearchController.fetchResults = function(term) {
  return fetch(`https://itunes.apple.com/search?media=podcast&term=${term}`)
    .then(results => results.json())
    .catch(err => console.error(err.message));
};

SearchController.formatResults = function(results) {
  let items = [];
  results.results.forEach(item => {
    items.push({
      feedUrl: item.feedUrl,
      showTitle: item.collectionName,
      showImageUrl: item.artworkUrl600,
      showSlug: slugify(item.collectionName.toLowerCase(), {
        remove: /[$*_+~.()'"!,?:@]/g,
      }),
    });
  });
  return items;
};

SearchController.prototype.runSearch = function(term) {
  SearchController.fetchResults(term)
    .then(results => SearchController.formatResults(results))
    .then(items => {
      const cards = document.querySelector('#result_cards');
      cards.innerHTML = '';
      items.forEach(item => {
        cards.innerHTML += searchResultsView(item);
      });
      return;
    })
    .catch(err => console.error(err.message));
};

SearchController.prototype.show = function() {
  app.innerHTML = searchFormView();
};

module.exports = SearchController;

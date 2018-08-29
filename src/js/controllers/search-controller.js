function SearchController() {
  // UI Elements
  this.searchSection = document.querySelector('#search');
  this.searchTerm = document.querySelector('#search_term');
  this.searchButton = document.querySelector('#search_button');
  this.resultCards = document.querySelector('#result_cards');
}

module.exports = SearchController;

const searchView = {
  searchFormView: function() {
    return `
      <section id="search" class="section">
        <div class="container">
          <h1 class="title is-1">PodBop</h1>
          <div class="field">
            <div class="control">
              <input class="input" type="text" name="search_term" id="search_term">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary" id="search_button">Search</button>
            </div>
          </div>
        </div>
        </section>
        <section class="section">
          <div class="container">
            <div id="result_cards" class="cards">
            </div>
          </div>
        </section>
    `;
  },

  searchResultsView: function(data) {
    console.log(data);
    return `
      <div class="card">
        <div class="card-image">
          <img src="${data.showImageUrl}">
        </div>
        <div class="card-content">
          <h4 class="subtitle is-4">
            ${data.showTitle}
          </h4>
          <button 
          class="button is-success subscribe_button"
          data-feed-url="${data.feedUrl}"
          data-show-title="${data.showTitle}"
          data-show-slug="${data.showSlug}"
          data-show-image-url="${data.showImageUrl}"
          >
          Subscribe
          </button>
        </div>
      </div>
    `;
  },
};
module.exports = searchView;

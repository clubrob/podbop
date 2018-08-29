function searchView(data) {
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
      <div class="container">
        <div id="result_cards">
        </div>
      </div>
    </section>
  `;
}

module.exports = searchView;

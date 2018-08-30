function homeView(data) {
  console.log(data);
  let cards = '';
  data.forEach(item => {
    cards += `
        <div class="card">
          <div class="card-image">
            <a href="/${item.showSlug}">
              <img src="${item.showImageUrl}">
            </a>
          </div>
          <div class="card-content">
            <h4 class="subtitle is-4">
              <a href="/${item.showSlug}">
                ${item.showTitle}
              </a>
            </h4>
            <p>
              <button 
                class="is-small is-danger button unsubscribe_button" 
                data-id="${item.id}"
              >
                Unsubscribe
              </button>
            </p>
          </div>
        </div>
    `;
  });

  return `
    <section id="home" class="section">
      <div class="container">
        <h1 class="title is-1">PodBop</h1>
        <h4 class="subtitle is-4">Playlists</h4>
        <h4 class="subtitle is-4">Subscriptions</h4>
        <div class="cards">
          ${cards}
        </div>
      </div>
    </section>
  `;
}

module.exports = homeView;

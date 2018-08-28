const slugify = require('slugify');

const searchButton = document.querySelector('#search_button');

searchButton.addEventListener('click', event => {
  const searchTerm = document.querySelector('#search_term').value;

  fetch(`https://itunes.apple.com/search?term=${searchTerm}`)
    .then(results => results.json())
    .then(results => {
      let list = document.querySelector('#results');
      list.innerHTML = '';
      return results.results.forEach(result => {
        if (result.kind === 'podcast') {
          let podData = {
            feedUrl: result.feedUrl,
            showTitle: result.collectionName,
            showImageUrl: result.artworkUrl600,
            showSlug: slugify(result.collectionName),
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
                data-feedUrl="${podData.feedUrl}"
                data-showTitle="${podData.showTitle}"
                data-showSlug="${podData.showSlug}"
                data-showImageUrl="${podData.showImageUrl}"
                >
                Subscribe
                </button>
              </div>
            </div>
          `;
          console.log(result);
        }
      });
    })
    .catch(err => console.error(err.message));

  event.preventDefault();
});

document.addEventListener('click', event => {
  const button = event.target;
  if (button && button.matches('.subscribe_button')) {
    console.log(button.dataset);
    event.preventDefault();
  }
});

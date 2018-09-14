const subscriptionView = {
  subscriptionMetaView: function(data) {
    let showList = '';
    data.feedItems.forEach(episode => {
      showList += `
        <li>
          <a 
            target="_blank" 
            class="episode-media-url" 
            href="${episode.mediaUrl}"
          >
              ${episode.title}
          </a>
        </li>
      `;
    });
    return `
      <section id="subscription" class="section">
      <div class="container section__title">
        <div class="content">
          <h1 class="title is-1">
            ${data.showTitle}
            <a class="refresh-it"></a>
          </h1>
        </div>
      </div>
        <div class="container">
          <div class="card">
            <div class="card-image">
              <figure class="image is-square">
                <a href="${data.showUrl}"><img src="${data.showImageUrl}"></a>
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <h5 class="subtitle is-5">
                  ${data.feedItems[0].title}
                </h5>
                <audio 
                id="track"
                preload
                src="${data.feedItems[0].mediaUrl}">
                Your browser does not support the audio element.
                </audio>
                <div class="player">
                  <button class="player__play player__button">Play</button>
                  <button class="player__pause player__button">Pause</button>
                  <progress class="player__progress" value="0" max="100"></progress>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="content">
            <h4 class="subtitle is-4">Recent Episodes</h4>
            <ul>
              ${showList}
            </ul>
          </div>
        </div>
      </section>
    `;
  },
  subscriptionFeedView: function() {},
};

module.exports = subscriptionView;

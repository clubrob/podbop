const subscriptionView = {
  subscriptionMetaView: function(data) {
    let showList = '';
    data.feedItems.forEach(episode => {
      showList += `
        <li>
          <a target="_blank" href="${episode.mediaUrl}">
            ${episode.title}
          </a>
        </li>
      `;
    });
    return `
      <section id="subscription" class="section">
        <div class="container">
          <h1 class="title is-1">${data.showTitle}</h1>
          <p><a href="${data.showUrl}"><img src="${data.showImageUrl}"></a></p>
          <h4 class="subtitle is-4">Recent Episodes</h4>
          <ul>
            ${showList}
          </ul>
        </div>
      </section>
    `;
  },
  subscriptionFeedView: function() {},
};

module.exports = subscriptionView;

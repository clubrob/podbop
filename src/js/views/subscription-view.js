const subscriptionView = {
  subscriptionMetaView: function(data) {
    return `
      <section id="subscription" class="section">
        <div class="container">
          <h1 class="title is-1">${data.showTitle}</h1>
        </div>
      </section>
    `;
  },
  subscriptionFeedView: function() {},
};

module.exports = subscriptionView;

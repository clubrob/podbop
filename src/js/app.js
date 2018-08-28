const searchButton = document.querySelector('#search_button');

searchButton.addEventListener('click', event => {
  const searchTerm = document.querySelector('#search_term').value;

  fetch(`https://itunes.apple.com/search?term=${searchTerm}`)
    .then(results => results.json())
    .then(results => {
      let list = document.querySelector('#results>ul');
      list.innerHTML = '';
      return results.results.forEach(result => {
        if (result.kind === 'podcast') {
          list.innerHTML += `
            <li>
              <a href='${result.feedUrl}' target="_blank">
                ${result.collectionName}
              </a>
            </li>
          `;
          console.log(result);
        }
      });
    })
    .catch(err => console.error(err.message));

  event.preventDefault();
});

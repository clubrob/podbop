function loginView(data) {
  return `
    <section id="login" class="section">
      <div class="container">
        <h1 class="title is-1">Log In</h1>
        <form class="form">
          <div class="field">
            <label for="email" class="label">Email</label>
            <div class="control">
              <input id="email" class="input is-primary" name="email" type="text" required>
            </div>
          </div>
          <div class="field">
            <label for="password" class="label">Password</label>
            <div class="control">
              <input id="password" class="input is-primary" name="password" type="password" required>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button id="login_button" class="button is-primary">Log In</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  `;
}

module.exports = loginView;

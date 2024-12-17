class User {
  #user;
  key;

  constructor(key = "user") {
    if (User.instance) {
      return User.instance;
    }
    this.key = key;
    User.instance = this;
    this.#user = localStorage.getItem(this.key)
      ? JSON.parse(localStorage.getItem(this.key))
      : null;
  }

  getUser() {
    return this.#user;
  }

  setUser(user) {
    localStorage.setItem(this.key, JSON.stringify(user));
    this.#user = user;
  }

  clearUser() {
    localStorage.removeItem(this.key);
    this.#user = null;
  }
}

export default User;

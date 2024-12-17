import Store from "./abstract.store";

class User extends Store {
  constructor(key = "user") {
    super(key);
    if (User.instance) {
      return User.instance;
    }
    User.instance = this;
  }
}

export default User;

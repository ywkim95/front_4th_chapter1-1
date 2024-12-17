import Store from "./abstract.store";

class UserStore extends Store {
  constructor(key = "user") {
    super(key);
    if (UserStore.instance) {
      return UserStore.instance;
    }
    UserStore.instance = this;
  }
}

export default UserStore;

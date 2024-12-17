import Store from "./abstract.store.js";
import json from "./posts.json";

class PostStore extends Store {
  constructor(key = "post") {
    super(key);
    if (PostStore.instance) {
      return PostStore.instance;
    }
    PostStore.instance = this;
    this.set(json.posts);
  }

  addPost(post) {
    this.set([post, ...this.get()]);
  }
}

export default PostStore;

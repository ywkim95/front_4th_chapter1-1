import Store from "./store.js";
import json from "../../public/posts.json";

class PostStore extends Store {
  constructor(key = "post") {
    super(key);
    if (PostStore.instance) {
      return PostStore.instance;
    }
    PostStore.instance = this;
    this.set(
      localStorage.getItem(this.key)
        ? JSON.parse(localStorage.getItem(this.key))
        : json.posts,
    );
  }

  addPost(post) {
    this.set([post, ...this.get()]);
  }
}

export default PostStore;

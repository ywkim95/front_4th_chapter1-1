import { PostStore, UserStore } from "./store";
import { pathRouter, hashRouter } from "./route";

window.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    if (e.target.id === "logout") {
      new UserStore().clear();
    }
    pathRouter(e.target.getAttribute("href"));
  }
});

const updateUserStore = (data) => {
  new UserStore().set({
    username: data.username,
    email: data.email ?? "",
    bio: data.bio ?? "",
  });
};

const updatePostStore = (username, content) => {
  new PostStore().addPost({
    username: username,
    content: content,
    createdAt: new Date(),
  });
};

window.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  if (form.id === "login-form" && data.username) {
    updateUserStore(data);
    pathRouter("/profile");
  }

  if (form.id === "profile-form") {
    updateUserStore(data);
    alert("프로필이 업데이트 되었습니다.");
  }

  if (form.id === "post-form") {
    const user = new UserStore().get();
    if (user.username) {
      updatePostStore(user.username, data.content);
      pathRouter("/");
    }
  }
});

window.addEventListener("popstate", () => pathRouter());
window.addEventListener("hashchange", () => hashRouter());
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    hashRouter();
  } else {
    pathRouter();
  }
});

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

window.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  if (form.id === "login-form" && data.username) {
    new UserStore().set({
      username: data.username,
      email: "",
      bio: "",
    });
    pathRouter("/profile");
  }

  if (form.id === "profile-form") {
    new UserStore().set({
      username: data.username,
      email: data.email ?? "",
      bio: data.bio ?? "",
    });
    pathRouter("/profile");
    alert("프로필이 업데이트 되었습니다.");
  }

  if (form.id === "post-form") {
    const user = new UserStore().get();
    if (user.username) {
      new PostStore().addPost({
        username: user.username,
        content: data.content,
        createdAt: new Date(),
      });
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

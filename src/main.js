import User from "./store";
import { pathRouter, hashRouter } from "./route";

window.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    if (e.target.id === "logout") {
      new User().clearUser();
    }
    pathRouter(e.target.getAttribute("href"));
  }
});

window.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  new User().setUser({
    username: data.username,
    email: data.email ?? "",
    bio: data.bio ?? "",
  });

  if (form.id === "login-form") {
    pathRouter("/profile");
  }

  if (form.id === "profile-form") {
    pathRouter("/profile");
    alert("프로필이 업데이트 되었습니다.");
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

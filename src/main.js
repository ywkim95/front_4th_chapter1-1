import MainPage from "./pages/main.js";
import LoginPage from "./pages/login.js";
import ProfilePage from "./pages/profile.js";
import ErrorPage from "./pages/error.js";
import User from "./user.store.js";

const hashRouter = (route) => {
  switch (route) {
    case "#/":
      return () => MainPage();
    case "#/login":
      return () => LoginPage();
    case "#/profile":
      return () => ProfilePage();
    default:
      return () => ErrorPage();
  }
};

const router = (route) => {
  switch (route) {
    case "/":
      return () => MainPage();
    case "/login":
      return () => LoginPage();
    case "/profile":
      return () => ProfilePage();
    default:
      return () => ErrorPage();
  }
};

const render = (route) => {
  const root = document.getElementById("root");
  root.innerHTML = route();
};

const validateUserPath = (route) => {
  const user = new User().getUser();
  if (!user && location.pathname === "/profile") {
    return "/login";
  }
  if (user && location.pathname === "/login") {
    return "/profile";
  }

  return route;
};

const validateUserHash = (route) => {
  const user = new User().getUser();
  if (!user && location.hash === "#/profile") {
    return "#/login";
  }
  if (user && location.hash === "#/login") {
    return "#/profile";
  }

  return route;
};

const go = (path) => {
  if (location.hash) {
    return goHash(path);
  }
  if (location.pathname === "/index.hash.html") {
    return goHash("#/");
  }
  const validatedPath = validateUserPath(path ?? location.pathname);
  const route = router(validatedPath) ?? router();
  history.pushState(null, null, validatedPath);
  render(route);
};

const goHash = (path) => {
  let newPath = path ?? location.hash;
  if (!newPath.includes("#")) {
    newPath = `#${newPath}`;
  }
  const validatedPath = validateUserHash(newPath);
  const hashRoute = hashRouter(validatedPath) ?? hashRouter();
  location.hash = validatedPath;
  render(hashRoute);
};

window.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    if (e.target.id === "logout") {
      new User().clearUser();
    }
    go(e.target.getAttribute("href"));
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
    go("/profile");
  }

  if (form.id === "profile-form") {
    go("/profile");
    alert("프로필이 업데이트 되었습니다.");
  }
});

window.addEventListener("popstate", () => go());
window.addEventListener("hashchange", () => goHash());
window.addEventListener("DOMContentLoaded", () => {
  if (location.hash) {
    goHash();
  } else {
    go();
  }
});

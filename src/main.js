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

const validateUser = (route) => {
  const user = new User().getUser();
  if (!user && location.pathname === "/profile") {
    return "/login";
  }
  if (user && location.pathname === "/login") {
    return "/profile";
  }

  return route;
};

const validateHash = (route) => {
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
  const validatedPath = validateUser(path ?? location.pathname);
  const route = router(validatedPath) ?? router();
  history.pushState(null, null, validatedPath);
  render(route);
};

const goHash = (path) => {
  const validatedPath = validateHash(path ?? location.hash);
  const route = hashRouter(validatedPath) ?? hashRouter();
  location.hash = validatedPath;
  render(route);
};

window.addEventListener("popstate", () => go());

window.addEventListener("DOMContentLoaded", () => go());

window.addEventListener("hashchange", () => goHash());

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
  const userForm = {
    username: data.username,
    email: data.email ?? "",
    bio: data.bio ?? "",
  };

  new User().setUser(userForm);

  if (location.pathname !== "/profile") {
    go("/profile");
  } else if (location.pathname === "/profile") {
    alert("프로필이 업데이트 되었습니다.");
  }
});

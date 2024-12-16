import MainPage from "./home.js";
import LoginPage from "./login.js";
import ProfilePage from "./profile.js";
import ErrorPage from "./error.js";
import Header from "./components/header.js";
import Footer from "./components/footer.js";

const router = () => {
  const root = document.getElementById("root");
  switch (location.pathname) {
    case "/": {
      root.innerHTML = MainPage();
      document.querySelector("#container").prepend(Header());
      document.querySelector("#container").append(Footer());

      break;
    }
    case "/login":
      root.innerHTML = LoginPage();
      break;
    case "/profile": {
      root.innerHTML = ProfilePage();
      document.querySelector("#container").prepend(Header());
      document.querySelector("#container").append(Footer());
      break;
    }
    default:
      root.innerHTML = ErrorPage();
  }
};

const checkProfile = () => {
  if (!localStorage.getItem("user")) {
    if (location.pathname === "/profile") {
      history.pushState(null, null, "/login");
      router();
    }
  }
  if (localStorage.getItem("user")) {
    if (location.pathname === "/login") {
      history.pushState(null, null, "/profile");
    }
    if (location.pathname === "/profile") {
      router();
      const user = JSON.parse(localStorage.getItem("user"));

      Object.entries(user).forEach(([key, value]) => {
        document.getElementById(key).value = value;
      });
    }
  }
};

window.addEventListener("popstate", () => {
  router();
  checkProfile();
});

window.addEventListener("DOMContentLoaded", () => {
  router();
  checkProfile();
});

window.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    if (e.target.id === "logout") {
      localStorage.removeItem("user");
    }
    history.pushState(null, null, e.target.getAttribute("href"));
    router();
    checkProfile();
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

  localStorage.setItem("user", JSON.stringify(userForm));

  if (location.pathname !== "/profile") {
    history.pushState(null, null, "/profile");
    router();
    checkProfile();
  } else {
    alert("프로필이 업데이트 되었습니다.");
  }
});

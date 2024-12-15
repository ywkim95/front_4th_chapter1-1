import MainPage from "./home.js";
import LoginPage from "./login.js";
import ProfilePage from "./profile.js";
import ErrorPage from "./error.js";

const checkUserMain = () => {
  if (localStorage.getItem("user")) {
    document.getElementById("nav").innerHTML = `
          <ul class="flex justify-around">
            <li><a href="/" class="text-blue-600">홈</a></li>
            <li><a href="/profile" class="text-gray-600">프로필</a></li>
            <li><a id="logout" href="/login" class="text-gray-600">로그아웃</a></li>
          </ul>
        `;
  } else {
    document.getElementById("nav").innerHTML = `
          <ul class="flex justify-around">
            <li><a id="home-link" href="/" class="text-blue-600">홈</a></li>
            <li><a id="login-link" href="/login" class="text-gray-600">로그인</a></li>
          </ul>
        `;
  }
};

const createHeader = () => {
  const header = document.createElement("header");
  header.classList.add("bg-blue-600", "text-white", "p-4", "sticky", "top-0");
  header.innerHTML = `<h1 class="text-2xl font-bold">항해플러스</h1>`;
  return header;
};

const createFooter = () => {
  const footer = document.createElement("footer");
  footer.classList.add("bg-gray-200", "p-4", "text-center");
  footer.innerHTML = `<p>&copy; 2024 항해플러스. All rights reserved.</p>`;
  return footer;
};

const router = () => {
  const root = document.getElementById("root");
  switch (location.pathname) {
    case "/": {
      root.innerHTML = MainPage();
      checkUserMain();
      document.querySelector("#container").prepend(createHeader());
      document.querySelector("#container").append(createFooter());

      break;
    }
    case "/login":
      root.innerHTML = LoginPage();
      break;
    case "/profile": {
      root.innerHTML = ProfilePage();
      document.querySelector("#container").prepend(createHeader());
      document.querySelector("#container").append(createFooter());
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
    if (location.pathname === "/profile") {
      router();
      const user = JSON.parse(localStorage.getItem("user"));

      Object.entries(user).forEach(([key, value]) => {
        document.getElementById(key).value = value;
      });
    }
    if (location.pathname === "/login") {
      history.pushState(null, null, "/profile");
      router();
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
  } else {
    alert("프로필이 업데이트 되었습니다.");
  }
});

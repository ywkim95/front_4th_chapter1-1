import { createElement } from "../util.js";

const getSelectedClass = (path) =>
  location.pathname === path ? "text-blue-600" : "text-gray-600";

const Header = () => {
  let li = `<li><a href="/" class="${getSelectedClass("/")}">홈</a></li>`;
  if (localStorage.getItem("user")) {
    li += `<li><a href="/profile" class="${getSelectedClass("/profile")}">프로필</a></li>
<li><a id="logout" href="/login" class="text-gray-600">로그아웃</a></li>`;
  } else {
    li += `<li><a id="login-link" href="/login" class="text-gray-600">로그인</a></li>`;
  }
  const ul = createElement("ul", ["flex", "justify-around"], li);

  const nav = createElement(
    "nav",
    ["bg-white", "shadow-md", "p-2", "sticky", "top-14"],
    "",
  );

  nav.append(ul);

  const header = createElement(
    "header",
    ["bg-blue-600", "text-white", "p-4", "sticky", "top-0"],
    '<h1 class="text-2xl font-bold">항해플러스</h1>',
  );

  const fragment = document.createDocumentFragment();
  fragment.append(header, nav);

  return fragment;
};

export default Header;

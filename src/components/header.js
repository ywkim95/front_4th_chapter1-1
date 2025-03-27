import { UserStore } from "../store";
import { getBasePath } from "../utils";

// 환경에 따른 기본 경로 가져오기
const BASE_PATH = getBasePath();

const getSelectedClass = (path) => {
  const location = window.location.hash
    ? window.location.hash.slice(1)
    : window.location.pathname;

  // 기본 경로가 있다면 제거하여 비교
  const normalizedLocation =
    BASE_PATH && location.startsWith(BASE_PATH)
      ? location.replace(BASE_PATH, "")
      : location;

  return normalizedLocation === path
    ? "text-blue-600 font-bold"
    : "text-gray-600";
};

const Header = () => {
  const user = new UserStore().get();

  // 환경에 따른 경로 생성
  const homePath = `${BASE_PATH}/`;
  const profilePath = `${BASE_PATH}/profile`;
  const loginPath = `${BASE_PATH}/login`;

  let li = `<li><a href="${homePath}" class="${getSelectedClass("/")}">홈</a></li>`;
  if (user) {
    li += `
      <li><a href="${profilePath}" class="${getSelectedClass("/profile")}">프로필</a></li>
      <li><a id="logout" href="${loginPath}" class="text-gray-600">로그아웃</a></li>
    `;
  } else {
    li += `<li><a id="login-link" href="${loginPath}" class="text-gray-600">로그인</a></li>`;
  }

  return `<header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          ${li}
        </ul>
      </nav>`;
};

export default Header;

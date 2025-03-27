import { validateUserHash, validateUserPath } from "../validate";
import { pathRoute, hashRoute } from "./route.js";
import render from "./render.js";
import { getBasePath } from "../utils";

// 환경에 따른 기본 경로 가져오기
const BASE_PATH = getBasePath();

// 테스트 환경인지 확인하는 함수
const isTestEnvironment = () => {
  return typeof process !== "undefined" && process.env.NODE_ENV === "test";
};

const includesHash = (condition, path) => {
  // 해시 경로인 경우 그대로 사용, 아닌 경우에만 BASE_PATH 추가
  const fullPath = path.includes("#") ? path : `${BASE_PATH}${path}`;
  condition
    ? (window.location.hash = path)
    : history.pushState(null, null, fullPath);
};

const getValidatedPath = (validateFunc, path) => {
  const validatedPath = validateFunc(path);
  includesHash(path.includes("#"), validatedPath);
  return validatedPath;
};

export const pathRouter = (path) => {
  if (window.location.hash) {
    return hashRouter(path);
  }
  if (window.location.pathname.includes("/index.hash.html")) {
    return hashRouter("#/");
  }

  path = path ?? window.location.pathname;

  // 기본 경로가 있다면 제거하여 경로 정규화
  if (BASE_PATH && path.startsWith(BASE_PATH)) {
    path = path.replace(BASE_PATH, "");
  }

  // 경로가 비어있거나 슬래시로 시작하지 않는 경우 처리
  if (path === "" || path === BASE_PATH) path = "/";
  if (!path.startsWith("/")) path = `/${path}`;

  const validatedPath = getValidatedPath(validateUserPath, path);
  render(pathRoute(validatedPath));
};

export const hashRouter = (hash) => {
  let newHash = hash ?? window.location.hash;

  // 해시가 없으면 기본 해시 추가
  if (!newHash.includes("#")) {
    newHash = `#${newHash}`;
  }

  // 이미 BASE_PATH가 포함된 경로 제거 (중복 방지)
  if (BASE_PATH && newHash.includes(`#${BASE_PATH}/`)) {
    newHash = newHash.replace(`#${BASE_PATH}`, "#");
  }

  // 해시 경로를 유효한 형식으로 변환
  const validatedHash = getValidatedPath(validateUserHash, newHash);

  // 현재 경로가 index.hash.html이 아니고 테스트 환경이 아닌 경우에만 리다이렉트
  if (
    !window.location.pathname.includes("/index.hash.html") &&
    !isTestEnvironment()
  ) {
    // GitHub Pages 환경에서는 기본 경로를 추가
    const redirectPath = `${BASE_PATH}/index.hash.html${validatedHash}`;
    window.location.href = redirectPath;
    return;
  }

  // 이미 올바른 페이지에 있는 경우 또는 테스트 환경인 경우 렌더링 진행
  render(hashRoute(validatedHash));
};

// 해시 라우팅 보존 스크립트
(function () {
  // 해시가 없는 경우 기본 해시 추가
  if (!window.location.hash) {
    window.location.hash = "#/";
  }

  // 해시 변경 이벤트 처리
  window.addEventListener("hashchange", function () {
    // 해시가 비어있으면 기본값으로 설정
    if (!window.location.hash) {
      window.location.hash = "#/";
    }
  });
})();

// main.js 임포트
import "./main.js";

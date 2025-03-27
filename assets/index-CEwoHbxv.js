(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();const L=e=>{const t=new Date,o=new Date(e),r=Math.floor((t.getTime()-o.getTime())/1e3),s=[{label:"년 전",seconds:31536e3},{label:"달 전",seconds:2592e3},{label:"일 전",seconds:86400},{label:"시간 전",seconds:3600},{label:"분 전",seconds:60},{label:"방금 전",seconds:0}];for(const n of s){const l=Math.floor(r/n.seconds);if(l===1/0)return"방금 전";if(l>0||n.label==="방금 전")return l>0?`${l}${n.label}`:n.label}return"지금"};class f{constructor(t){this.key=t,this.value=localStorage.getItem(this.key)?JSON.parse(localStorage.getItem(this.key)):null}get(){return this.value}set(t){localStorage.setItem(this.key,JSON.stringify(t)),this.value=t}clear(){localStorage.removeItem(this.key),this.value=null}}class a extends f{constructor(t="user"){if(super(t),a.instance)return a.instance;a.instance=this}}const P=[{username:"홍길동",content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",createdAt:"2024-12-17T13:17:21.691Z"},{username:"김철수",content:"새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",createdAt:"2024-12-17T12:17:21.691Z"},{username:"이영희",content:"오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",createdAt:"2024-12-17T11:17:21.691Z"},{username:"박민수",content:"주말에 등산 가실 분 계신가요? 함께 가요!",createdAt:"2024-12-17T10:17:21.691Z"},{username:"정수연",content:"새로 나온 영화 재미있대요. 같이 보러 갈 사람?",createdAt:"2024-12-17T09:17:21.691Z"}],E={posts:P};class i extends f{constructor(t="post"){if(super(t),i.instance)return i.instance;i.instance=this,this.set(localStorage.getItem(this.key)?JSON.parse(localStorage.getItem(this.key)):E.posts)}addPost(t){this.set([t,...this.get()])}}const b=e=>{const t=document.getElementById("root");t.innerHTML=e()},h={main:"/",login:"/login",profile:"/profile"},p={main:"#/",login:"#/login",profile:"#/profile"},u=e=>(window.location.hash?window.location.hash.slice(1):window.location.pathname)===e?"text-blue-600 font-bold":"text-gray-600",g=()=>{const e=new a().get();let t=`<li><a href="/" class="${u("/")}">홈</a></li>`;return e?t+=`
      <li><a href="/profile" class="${u("/profile")}">프로필</a></li>
      <li><a id="logout" href="/login" class="text-gray-600">로그아웃</a></li>
    `:t+='<li><a id="login-link" href="/login" class="text-gray-600">로그인</a></li>',`<header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          ${t}
        </ul>
      </nav>`},w=()=>`<footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>`,O=e=>{const{username:t,content:o,createdAt:r}=e;return`<div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">${t}</p>
                <p class="text-sm text-gray-500">${L(r)}</p>
              </div>
            </div>
            <p>${o}</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>`},S=()=>`${new i().get().map(O).join("")}`,A=()=>`<input name="username" id="username" type="hidden" value="${new a().get().username}"/>`,k=()=>{var e;return`
    <form id="post-form">
      <div class="mb-4 bg-white rounded-lg shadow p-4">
        <textarea name="content" id="content" class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
        ${(e=new a().get())!=null&&e.username?A():""}
        <button type="submit" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
      </div>
    </form>`},I=()=>`
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div id="container" class="max-w-md w-full">
    ${g()}
      <main class="p-4">
        ${k()}
        <div class="space-y-4">
          ${S()}
        </div>
      </main>
      ${w()}
    </div>
  </div>
`,T=()=>`
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input id="username" name="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input id="password" name="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
      </div>
      <hr class="my-6">
      <div class="text-center">
        <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
      </div>
    </div>
  </main>
`,j=()=>{const e=new a().get();return`
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div id="container" class="max-w-md w-full">
      ${g()}
      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
            내 프로필
          </h2>
          <form id="profile-form">
            <div class="mb-4">
              <label
                for="username"
                class="block text-gray-700 text-sm font-bold mb-2"
                >사용자 이름</label
              >
              <input
                type="text"
                id="username"
                name="username"
                value="${e.username}"
                class="w-full p-2 border rounded"
              />
            </div>
            <div class="mb-4">
              <label
                for="email"
                class="block text-gray-700 text-sm font-bold mb-2"
                >이메일</label
              >
              <input
                type="email"
                id="email"
                name="email"
                value="${e.email}"
                class="w-full p-2 border rounded"
              />
            </div>
            <div class="mb-6">
              <label
                for="bio"
                class="block text-gray-700 text-sm font-bold mb-2"
                >자기소개</label
              >
              <textarea
                id="bio"
                name="bio"
                rows="4"
                class="w-full p-2 border rounded"
              >${e.bio}</textarea
              >
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 text-white p-2 rounded font-bold"
            >
              프로필 업데이트
            </button>
          </form>
        </div>
      </main>
      ${w()}
    </div>
  </div>
`},D=()=>`
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
      <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
      <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
      <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <p class="text-gray-600 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
        홈으로 돌아가기
      </a>
    </div>
  </main>
`,v=(e,t)=>{switch(e){case t.main:return()=>I();case t.login:return()=>T();case t.profile:return()=>j();default:return()=>D()}},H=e=>v(e,p),N=e=>v(e,h),x=(e,t)=>{const o=new a().get();return!o&&e===t.profile?t.login:o&&e===t.login?t.main:e},R=e=>x(e,h),M=e=>x(e,p),F=(e,t)=>{e?window.location.hash=t:history.pushState(null,null,t)},y=(e,t)=>{const o=e(t);return F(t.includes("#"),o),o},c=e=>{if(window.location.hash)return d(e);if(window.location.pathname==="/index.hash.html")return d("#/");e=e??window.location.pathname;const t=y(R,e);b(N(t))},d=e=>{let t=e??window.location.hash;t.includes("#")||(t=`#${t}`);const o=y(M,t);b(H(o))},m=e=>{new a().set({username:e.username,email:e.email??"",bio:e.bio??""})},C=(e,t)=>{new i().addPost({username:e,content:t,createdAt:new Date})},Z=e=>{e.target.tagName==="A"&&(e.preventDefault(),e.target.id==="logout"&&new a().clear(),c(e.target.getAttribute("href")))},U=e=>{e.preventDefault();const t=e.target,o=new FormData(t),r=Object.fromEntries(o);if(t.id==="login-form"&&r.username&&(m(r),c("/profile")),t.id==="profile-form"&&(m(r),alert("프로필이 업데이트 되었습니다.")),t.id==="post-form"){const s=new a().get();s.username&&(C(s.username,r.content),c("/"))}},J=()=>{window.location.hash?d():c()},q=()=>{d()},z=()=>{c()},$={click:Z,submit:U,DOMContentLoaded:J,hashchange:q,popstate:z},B=e=>{window.addEventListener(e,$[e])},K=e=>{window.removeEventListener(e,$[e])},V=()=>{const e=["click","submit","DOMContentLoaded","popstate","hashchange"];return e.forEach(B),()=>{e.forEach(K)}};V();

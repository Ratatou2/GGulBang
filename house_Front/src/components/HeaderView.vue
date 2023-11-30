<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const isLogin = computed(() => !!authStore.token);
const userId = computed(() => authStore.user.userId);
const role = computed(() => authStore.user.role);

const logout = () => {
  if (!confirm("로그아웃 하시겠습니까?")) return;
  authStore.logout();
  router.push("/login");
};

const isAdmin = () => {
  console.log("role", role.value);
  if (role.value === "admin") {
    console.log("관리자 입니다.");
    return true;
  } else {
    console.log("일반 사용자 입니다.");
    false;
  }
};
</script>

<template>
  <header>
    <!-- ul 하나로 통합 -->
    <ul class="">
      <li class="user-info">
        <template v-if="!isLogin">
          <RouterLink to="/login">로그인</RouterLink>
          /
          <RouterLink to="">회원가입</RouterLink>
        </template>
        <template v-else>
          <template v-if="isAdmin()">
            <RouterLink to="/adminPage" style="color: #ddbc2b">{{ userId }}님</RouterLink>
          </template>
          <template v-else>
            <RouterLink to="/myPage" style="color: #ddbc2b">{{ userId }}님</RouterLink>
          </template>

          /
          <button @click="logout">로그아웃</button>
        </template>
      </li>
    </ul>
    <ul>
      <li></li>
    </ul>
    <ul>
      <li></li>
    </ul>
    <ul class="nav-list">
      <li><RouterLink to="/board">게시판</RouterLink></li>
      <li><RouterLink to="/house">매물 리스트</RouterLink></li>
      <li class="tmp">
        <a href="/assets/Main/Main_html5/index.html">
          <img class="bee_home" src="../assets/bee.png" alt="Basket Image" />
        </a>
      </li>
      <li><RouterLink to="/basket">장바구니</RouterLink></li>
      <li><RouterLink to="/chat">채팅</RouterLink></li>
    </ul>
  </header>
</template>

<style scoped>
/* 가로로 배열하도록 스타일 추가 */
ul {
  display: flex;
  list-style: none;
  padding: 0;
}

/* 각 li 요소 간의 간격을 조절 */
li {
  margin-right: 10px;
}

/* 로그인/로그아웃 영역을 오른쪽으로 밀어넣기 */
.user-info {
  margin-left: auto;
}

@font-face {
  font-family: "BMJUA";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

template {
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  min-height: 100vh; /* 높이 100%로 설정하여 화면 전체를 채우도록 함 */
  margin: 0; /* body의 기본 margin 제거 */
}

/* 전체 페이지의 가운데 정렬을 위해 header에 text-align: center; 추가 */
header {
  font-family: "BMJUA", sans-serif; /* 폰트를 적용합니다. */
  text-align: center; /* 전체 페이지의 가운데 정렬 */
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 40px; /* 간격 추가 */
  font-size: 22px; /* 폰트 크기 추가 */
  width: fit-content;
  margin: 0 auto;
}

.nav-list li {
  margin-right: 15px;
}

.user-info {
  font-family: "BMJUA", sans-serif; /* 폰트를 적용합니다. */
}
.bee_home {
  height: 20%; /* 이미지 높이 100%로 유지 */
  width: 20%; /* 이미지 너비 100%로 유지 */
  display: block;
  margin: 0 auto; /* 이미지를 가운데 정렬 */
}

/* a 태그 스타일 수정 */
.tmp a {
  width: 25%; /* 부모 요소의 너비를 25%로 지정 */
  text-decoration: none; /* 하이퍼링크 밑줄 제거 */
  color: inherit; /* 링크 색상을 부모 요소의 색상으로 상속 */
}

a {
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 기본 색상 사용 (부모 요소의 색상 상속) */
}

/* hover 시의 스타일링 */
a:hover {
  text-decoration: none; /* hover 시 밑줄 제거 */
  color: inherit; /* hover 시 색상 변경 없음 (부모 요소의 색상 상속) */
}

/* visited 상태의 스타일링 */
a:visited {
  color: inherit; /* 방문한 링크의 색상 변경 없음 (부모 요소의 색상 상속) */
}

/* active 상태의 스타일링 */
a:active {
  color: inherit; /* 클릭 시 색상 변경 없음 (부모 요소의 색상 상속) */
}
</style>

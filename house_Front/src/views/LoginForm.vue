<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

const router = useRouter();

const loginForm = ref({
  userId: "",
  userPass: "",
});

const login = async () => {
  try {
    await authStore.login(loginForm.value);
    router.push("/house/list");
  } catch (error) {
    console.log("로그인 실패 에러:", error);
    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
  }
};
</script>

<template>
  <!DOCTYPE html>
  <html lang="ko">
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
      <link rel="shortcut icon" href="static/pc/images/favicon.ico" />
    </head>
    <link rel="stylesheet" href="static/pc/dist/megabox.min.css" media="all" />
    <body>
      <div class="body-wrap">
        <body class="bg-member">
          <div class="member-wrap">
            <div class="col-wrap">
              <div class="col">
                <p class="tit-member">로그인</p>

                <div class="tab-list">
                  <ul>
                    <li class="on">
                      <a href="#" title="아이디찾기 선택">로그인</a>
                    </li>
                    <li>
                      <RouterLink to="/registMember">회원가입</RouterLink>
                    </li>
                  </ul>
                </div>
                <form @submit.prevent="login">
                  <fieldset>
                    <div class="table-wrap">
                      <table class="board-form">
                        <colgroup>
                          <col style="width: 130px" />
                          <col />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th scope="row">
                              <label for="ibxSchIdMbNm">ID</label>
                            </th>
                            <td>
                              <input
                                v-model="loginForm.userId"
                                maxlength="20"
                                type="text"
                                placeholder="ID"
                                class="input-text w230px"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="ibxSchIdBirthDe">PW</label>
                            </th>
                            <td>
                              <input
                                v-model="loginForm.userPass"
                                type="password"
                                placeholder="Password"
                                class="input-text w230px"
                              />
                              <div id="schIdBirthDe-error-text" class="alert"></div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="mt20 font-size-14">※ 3회 이상 틀릴 시 계정 폭파합니다</div>
                    <div class="mt20 font-size-14"><a href="/findPassword">※ 비밀번호 찾기</a></div>

                    <div class="btn-member-bottom v1">
                      <button class="button purple large">로그인</button>
                    </div>
                  </fieldset>
                </form>
                <h2 class="tit">본인인증으로 로그인</h2>

                <div class="">본인인증 로그인 시 회원가입을 진행하셔야 합니다</div>

                <div class="btn-member-bottom">
                  <button type="button" class="button purple large">본인인증 로그인</button>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    </body>
  </html>
</template>

<style scoped>
@import url("@/assets/static/pc/dist/megabox.min.css");

html {
  overflow: hidden;
}

body {
  overflow: hidden;
}
</style>

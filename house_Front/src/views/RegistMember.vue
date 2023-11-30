<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
const authStore = useAuthStore();

const router = useRouter();

const registForm = ref({
  userId: "",
  userPass: "",
  userName: "",
  address: "",
  tel: "",
});

const regist = async () => {
  try {
    console.log("registForm", registForm.value);
    await axios.post(`/api/member/regist`, registForm.value);
    router.push("/house/list");
    alert("회원가입 성공");
  } catch (error) {
    console.log("회원가입 실패 에러:", error);
    alert("회원가입 실패");
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
                <p class="tit-member">회원가입</p>

                <div class="tab-list">
                  <ul>
                    <li class="on">
                      <RouterLink to="/login">로그인</RouterLink>
                    </li>
                    <li>
                      <a href="#" title="비밀번호 찾기 선택">회원가입</a>
                    </li>
                  </ul>
                </div>
                <form @submit.prevent="regist">
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
                                v-model="registForm.userId"
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
                                v-model="registForm.userPass"
                                type="password"
                                placeholder="Password"
                                class="input-text w230px"
                              />
                              <div id="schIdBirthDe-error-text" class="alert"></div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="ibxSchIdBirthDe">이름</label>
                            </th>
                            <td>
                              <input
                                v-model="registForm.userName"
                                type="text"
                                placeholder="이름"
                                class="input-text w230px"
                              />
                              <div id="schIdBirthDe-error-text" class="alert"></div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="ibxSchIdBirthDe">이메일</label>
                            </th>
                            <td>
                              <input
                                v-model="registForm.address"
                                type="text"
                                placeholder="abc@def.com"
                                class="input-text w230px"
                              />
                              <div id="schIdBirthDe-error-text" class="alert"></div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="ibxSchIdBirthDe">전화번호</label>
                            </th>
                            <td>
                              <input
                                v-model="registForm.tel"
                                type="text"
                                placeholder="000-0000-0000"
                                class="input-text w230px"
                              />
                              <div id="schIdBirthDe-error-text" class="alert"></div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="btn-member-bottom v1">
                      <button class="button purple large">회원가입</button>
                    </div>
                  </fieldset>
                </form>
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

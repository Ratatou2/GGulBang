<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

const router = useRouter();

const resetForm = ref({
  userName: "",
  userName: "",
  tel: "",
  questionNo: "",
  answer: "",
});

const resetPassword = async () => {
  console.log(resetForm.value);

  for (const key in resetForm.value) {
    if (resetForm.value[key] === null || resetForm.value[key] === undefined || resetForm.value[key] === "") {
      alert("비어있는 값이 있습니다. 전부 다 채워주세요.");
      return;
    }
  }

  try {
    await authStore.resetPassword(resetForm.value);
    alert("정상적으로 초기화 되었습니다 (초기 비밀번호 = userId + 2023!)");
    router.push("/login");
  } catch (error) {
    console.log("비밀번호 초기화 실패 :", error);
    alert("입력값이 기존 데이터와 일치하지 않습니다");
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
                <p class="tit-member">비밀번호 초기화</p>

                <div class="tab-list">
                  <ul>
                    <li class="on">
                      <a href="#" title="비밀번호 선택">비밀번호 초기화</a>
                    </li>
                    <li>
                      <a href="/login" title="로그인 선택">로그인</a>
                    </li>
                  </ul>
                </div>
                <form @submit.prevent="resetPassword">
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
                                v-model="resetForm.userId"
                                type="text"
                                placeholder="ID"
                                class="input-text w230px"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="ibxSchIdBirthDe">userName</label>
                            </th>
                            <td>
                              <input
                                v-model="resetForm.userName"
                                type="text"
                                placeholder="userName"
                                class="input-text w230px"
                              />
                              <div id="schIdBirthDe-error-text" class="alert"></div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="ibxSchIdMbNm">tel</label>
                            </th>
                            <td>
                              <input
                                v-model="resetForm.tel"
                                type="text"
                                placeholder="010-0000-0000"
                                class="input-text w230px"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="ibxSchIdMbNm">questionNo</label>
                            </th>
                            <td>
                              <input
                                v-model="resetForm.questionNo"
                                type="text"
                                placeholder="questionNo"
                                class="input-text w230px"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="ibxSchIdMbNm">answer</label>
                            </th>
                            <td>
                              <input
                                v-model="resetForm.answer"
                                type="text"
                                placeholder="answer"
                                class="input-text w230px"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="btn-member-bottom v1">
                      <button class="button purple large">초기화</button>
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

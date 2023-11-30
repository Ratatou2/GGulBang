<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

const router = useRouter();
const userId = computed(() => authStore.user.userId);

const passwordForm = ref({
  userId: userId.value,
  userpass: "",
  userNewpass: "",
  userNewpassCheck: "",
});

const updatePassword = async () => {
  for (const key in passwordForm.value) {
    console.log("값 체크요 : ", passwordForm.value[key]);
    if (passwordForm.value[key] === null || passwordForm.value[key] === undefined || passwordForm.value[key] === "") {
      alert("비어있는 값이 있습니다. 전부 다 채워주세요.");
      return;
    }
  }

  if (passwordForm.value.userNewpass != passwordForm.value.userNewpassCheck) {
    alert("새로운 비밀번호가 일치하지 않습니다. 확인해주세요.");
    return;
  }

  const newPasswordForm = ref({
    userId: userId.value,
    userPass: passwordForm.value.userpass,
    userNewPass: passwordForm.value.userNewpass,
  });

  console.log("넘길 값 : ", newPasswordForm.value);

  try {
    await authStore.updatePassword(newPasswordForm.value);
    router.push("/myPage");
  } catch (error) {
    console.log("비밀번호 업데이트 실패:", error);
    alert("문제가 발생했습니다. 관리자에게 문의해주세요.");
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
                <p class="tit-member">비밀번호 재설정</p>

                <div class="tab-list">
                  <ul>
                    <li class="on">
                      <a href="#" title="비밀번호 재설정">비밀번호 재설정</a>
                    </li>
                  </ul>
                </div>
                <form @submit.prevent="updatePassword">
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
                              <label for="ibxSchIdMbNm">현재 비밀번호</label>
                            </th>
                            <td>
                              <input
                                v-model="passwordForm.userpass"
                                type="password"
                                placeholder="current password"
                                class="input-text w230px"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="ibxSchIdBirthDe">새 비밀번호</label>
                            </th>
                            <td>
                              <input
                                v-model="passwordForm.userNewpass"
                                type="password"
                                placeholder="New Password"
                                class="input-text w230px"
                              />
                              <div id="schIdBirthDe-error-text" class="alert"></div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="ibxSchIdBirthDe">새 비밀번호 확인</label>
                            </th>
                            <td>
                              <input
                                v-model="passwordForm.userNewpassCheck"
                                type="password"
                                placeholder="New Password Check"
                                class="input-text w230px"
                              />
                              <div id="schIdBirthDe-error-text" class="alert"></div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="btn-member-bottom v1">
                      <button class="button purple large">비밀번호 변경</button>
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

.board-form tbody th {
  padding-left: 14px;
}
</style>

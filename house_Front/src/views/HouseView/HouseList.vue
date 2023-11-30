<script setup>
import VPageNavigation from "../../components/common/VPageNavigation.vue";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { localAxios } from "@/utils/http-commons";
import { useHouseStore } from "../../stores/house";
import { useBasketStore } from "../../stores/basket";
import { useAuthStore } from "../../stores/auth";
import { reformLists } from "@/utils/tools";

const houses = ref([]);

const authStore = useAuthStore();
const houseStore = useHouseStore();
const basketStore = useBasketStore();

const userId = computed(() => authStore.user.userId);
const role = computed(() => authStore.user.role);

const reformMyHouses = computed(() => reformLists(houses.value));

const router = useRouter();

const currentPage = ref(1);
const totalPage = ref(0);
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;
const hasHouses = computed(() => houses.value.length > 0);

//231115 백성욱 : 검색 설정 start
const selectOption = ref([
  { text: "--- 선택 ---", value: "" },
  { text: "아파트명", value: "apartmentName" },
  { text: "도로명", value: "roadName" },
]);

const param = ref({
  pgno: currentPage.value, //현재 페이지 번호
  spp: VITE_ARTICLE_LIST_SIZE, //한 페이지에 얻어올 게시글 개수
  key: "", //조건 검색 시 컬럼명
  word: "", //해당 컬럼에 일치하는 데이터
});

//231115 백성욱 : 검색 설정 end
console.log("유저정보 : ", authStore.user);
console.log("유저 아이디  : ", userId.value);
houseStore.getMyHouseList(userId.value);
// console.log("내 매물 목록 ", myHouseList);

function onPageChange(value) {
  console.log(value, "페이지 변화 감지");
  param.value.pgno = value;
  getHouseList();
}

const url = "/house";
const local = localAxios();

function selectAdminHouseAll(param, success, fail) {
  local.get(`${url}/admin`, { params: param }).then(success).catch(fail);
}

function selectHouseAll(param, success, fail) {
  local.get(`${url}/user`, { params: param }).then(success).catch(fail);
}

const getHouseList = () => {
  console.log("서버로 글목록 얻으러 가자!!!", param.value);
  console.log("role : ", role.value);
  //api호출
  if (role.value === "admin") {
    selectAdminHouseAll(
      param.value,
      ({ data }) => {
        houses.value = data.houses;
        console.log("houses : ", houses);
        currentPage.value = data.currentPage;
        totalPage.value = data.totalPageCount;
      },
      (error) => {
        console.log(error);
      }
    );
  } else {
    selectHouseAll(
      param.value,
      ({ data }) => {
        houses.value = data.houses;
        console.log("data.houses : ", data.houses);
        console.log("houses : ", houses);
        currentPage.value = data.currentPage;
        totalPage.value = data.totalPageCount;
        console.log("토탈페이지 : ", data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
};

getHouseList();

const searchByKey = () => {
  param.value.pgno = 1;
  getHouseList();
};

const addBasket = (aptCode) => {
  // console.log(aptCode, ownerId);
  if (userId.value == "") {
    alert("로그인 권한 필요");
    router.push("/login"); // 인증되지 않은 경우, 로그인 페이지로 리다이렉트
    return;
  }
  const basketInfo = ref({
    userId: userId.value,
    aptCode: aptCode,
  });

  try {
    console.log("basket: ", basketInfo);
    basketStore.addBasket(basketInfo.value);
    alert("장바구니 추가 완료하였습니다");
  } catch (error) {
    console.error("장바구니 추가 실패 :", error);
    alert("장바구니 추가 실패헀습니다 ㅠ");
  }
};

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 19) + 1;
};
console.log(import.meta.url);
const generateImagePath = () => {
  return `/assets/static/pc/images/reserve/private2022_${generateRandomNumber()}.jpg`;
};
</script>

<template>
  <!DOCTYPE html>
  <html lang="ko">
    <body>
      <div class="body-wrap" style="overflow: hidden">
        <div class="container">
          <div id="contents" class="pt00">
            <div class="private2022">
              <div class="inner-wrap">
                <div class="packageArea">
                  <h3 class="tit">매물 리스트</h3>
                  <RouterLink to="/house/regist">매물등록</RouterLink>
                  <div class="pg_text searchBox">
                    현재 판매 중인 매물입니다!
                    <form class="d-flex" @submit.prevent="searchByKey">
                      <select v-model="param.key" class="select_custom">
                        <option
                          class="option_custom"
                          v-for="(option, index) in selectOption"
                          :key="index"
                          :value="option.value"
                          :disabled="option.value === ''"
                        >
                          {{ option.text }}
                        </option>
                      </select>
                      <div class="input_custom">
                        <input
                          type="text"
                          v-model="param.word"
                          class="form-control"
                          placeholder="검색어"
                          @keyup.enter="getHouseList"
                        />
                        <button
                          class="add_button_custom"
                          type="button"
                          @click="getHouseList"
                        >
                          검색
                        </button>
                      </div>
                    </form>
                  </div>

                  <div v-if="!hasHouses" class="no-result-message">
                    검색된 매물이 없습니다.
                  </div>

                  <div v-else class="packageBox act" id="packageBox">
                    <!-- for문 반복 -->
                    <div
                      class="itemWrap"
                      v-for="myHouses in reformMyHouses"
                      :key="houses[0].aptCode"
                    >
                      <div
                        class="basket-item item"
                        v-for="house in myHouses"
                        :key="house.aptCode"
                        @click="houseStore.moveDetail(house.aptCode)"
                      >
                        <input
                          :id="house.aptCode"
                          type="checkbox"
                          name="privPackCd"
                        />
                        <label :for="house.aptCode">
                          <div class="img">
                            <img :src="generateImagePath()" alt="집집집" />
                          </div>
                          <div class="food-info">
                            <div class="name-area">
                              <p class="name" :price="house.price">
                                {{ house.apartmentName }}
                              </p>

                              <p class="price">
                                <em>{{ house.price }}</em>
                                <span>원</span>
                              </p>
                            </div>

                            <ul class="dot_list">
                              <li>
                                <button
                                  class="add-basket-btn"
                                  @click.stop="addBasket(house.aptCode)"
                                >
                                  추가
                                </button>
                              </li>
                              <li>{{ house.sidoName }}</li>
                              <li>{{ house.gugunName }}</li>
                              <li>{{ house.dong }}</li>
                              <li>{{ house.roadName }}</li>
                              <li>{{ house.ownerId }}</li>
                            </ul>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="packageArea_custom">
        <VPageNavigation
          :current-page="currentPage"
          :total-page="totalPage"
          @page-change="onPageChange"
          :navigation-size="5"
        ></VPageNavigation>
      </div>
    </body>
  </html>
</template>

<style scoped>
@import url("@/assets/static/pc/dist/megabox.min.css");
.packageArea_custom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

html {
  overflow: hidden;
}

body {
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  margin: 10px 0; /* 상하 여백 추가 */
  overflow: hidden;
}

th,
td {
  text-align: center; /* 가운데 정렬을 추가합니다. */
  padding: 8px;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
}

th.rounded,
td.rounded {
  border-radius: 60px;
}

th:first-child,
td:first-child {
  border-left: 120px solid #ffffff;
}

th:last-child,
td:last-child {
  border-right: 120px solid #ffffff;
}

.add_button_custom {
  width: 40%;
  border: none;
  border-radius: 5px;
  background-color: rgb(172, 172, 172);
  color: #ffffff;
  cursor: pointer;
  z-index: 2;
  text-align: center;
  justify-content: center;
}

.basket-item:hover {
  background-color: rgb(255, 212, 72);
}
.basket-item:hover {
  background: rgb(255, 212, 72);
  background: linear-gradient(rgb(255, 249, 230));
}

.add-basket-btn {
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  background-color: rgb(255, 212, 72);
  color: #fff;
  cursor: pointer;
  z-index: 2;
}

.add-basket-btn:hover {
  background: linear-gradient(
    rgb(255, 249, 227)
  ); /* 호버 시 페이드 아웃 효과 */
}

.searchBox {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 추가된 부분 */
}

/* 공통 스타일 */
.select_custom {
  height: 31px;
}
.input_custom input,
.input_custom button {
  height: 30px; /* 원하는 높이로 조절하세요 */
}

/* 인풋박스 스타일 */
.input_custom {
  display: flex;
  justify-content: center;
  border: 1px solid #f8f8fa; /* 테두리 색을 #f8f8fa로 설정 */
}

/* 셀렉트 박스 스타일 */
.select_custom {
  width: 120px;
  text-align: center;
  justify-content: center;
  border: 1px solid #c2c2c2; /* 테두리 색을 #a8a8a8로 설정 */
}

.option_custom {
  color: black;
  text-align: center;
}
</style>

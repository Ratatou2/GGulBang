<script setup>
import VPageNavigation from "../../components/common/VPageNavigation.vue";
import SearchBar from "../../components/SearchBar.vue";
import { RouterLink, useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { localAxios } from "@/utils/http-commons";
import KakaoMap from "@/components/common/KakaoMap.vue";
// import VKakaoMap from "@/components/common/VKakaoMap.vue";
import { useHouseStore } from "../../stores/house";
import { useBasketStore } from "../../stores/basket";
import { useAuthStore } from "../../stores/auth";
import VSelect from "@/components/common/VSelect.vue";
import { temp } from "../../stores/product";

const houses = ref([]);

const authStore = useAuthStore();
const houseStore = useHouseStore();
const basketStore = useBasketStore();

const myHouseList = computed(() => houseStore.MyHouseList);
const userId = computed(() => authStore.user.userId);
const role = computed(() => authStore.user.role);

const totalPageCount = computed(() => houseStore.totalPageCount);

const router = useRouter();

const currentPage = ref(1);
const totalPage = ref(0);
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;

//231115 백성욱 : 검색 설정 start
const selectOption = ref([
  { text: "--- 선택 ---", value: "" },
  { text: "아파트명", value: "apartmentName" },
  { text: "도로명", value: "roadName" },
]);

//변경된 key 값 params의 key에 설정하기
const changeKey = (val) => {
  param.value.key = val;
};

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
console.log("내 매물 목록 ", myHouseList);

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

onMounted(() => {
  getHouseList();
});

const addBasket = (aptCode) => {
  console.log(aptCode, ownerId);
  if (userId.value == "") {
    alert("로그인 권한 필요");
    router.push("/login"); // 인증되지 않은 경우, 로그인 페이지로 리다이렉트
    return;
  }

  // 중복된 매물 등록 차단
  // if (myHouseList.value != null){
  //   for (const houseInfo of myHouseList) {
  //     console.log("중복 매물 체크 로직체크", houseInfo.value);
  //     if (houseInfo.value.aptCode == aptCode) {
  //       alert("이미 장바구니에 존재하는 매물입니다.")
  //     }
  //   }
  // } else {
  //   console.log("보유 매물 없다잉");
  // }

  //소유주 아이디와 겹치는 경우 block
  // if (userId.value == ownerId) {
  //   alert("자기 자신의 매물은 추가할 수 없습니다.");
  //   return;
  // }

  const basketInfo = ref({
    userId: userId.value,
    aptCode: aptCode,
  });

  try {
    basketStore.addBasket(basketInfo.value);
    alert("장바구니 추가 완료하였습니다");
  } catch (error) {
    console.error("장바구니 추가 실패 :", error);
    alert("장바구니 추가 실패헀습니다 ㅠ");
  }
};

// 검색 파트, 추후에 기능 추가
// const getSearchArticles = (searchKeyword) => {
//   // console.log("BoardList의 조건 검색 메소드 호출:", searchKeyword);

//   params.value.key = searchKeyword.key;
//   params.value.word = searchKeyword.word;
//   params.value.pgno = 1;

//   // 목록 조회 필요
//   houseStore.getMyBasket(params.value);
// };
</script>

<template>
  <div>
    <KakaoMap />
    <!-- <VKakaoMap :houses="houseList" /> -->
    <h1>매물 목록</h1>

    <form class="d-flex">
      <VSelect :select-option="selectOption" @on-key-select="changeKey" />
      <div class="input-group input-group-sm">
        <input
          type="text"
          v-model="param.word"
          class="form-control"
          placeholder="검색어..."
        />
        <button class="btn btn-dark" type="button" @click="getHouseList">
          검색
        </button>
      </div>
    </form>
    <v-table fixed-header>
      <thead>
        <tr>
          <th class="rounded">장바구니 추가</th>
          <th class="rounded">아파트명</th>
          <th class="rounded">아파트 코드</th>
          <th class="rounded">동</th>
          <th class="rounded">도로명</th>
          <th class="rounded">건축 연도</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="basket-item"
          v-for="house in houses"
          :key="house.aptCode"
          @click="houseStore.moveDetail(house.aptCode)"
        >
          <td>
            <button
              class="add-basket-btn"
              @click.stop="addBasket(house.aptCode)"
            >
              추가
            </button>
          </td>
          <td>{{ house.apartmentName }}</td>
          <td>{{ house.aptCode }}</td>
          <td>{{ house.dong }}</td>
          <td>{{ house.roadName }}</td>
          <td>{{ house.buildYear }}</td>
        </tr>
      </tbody>
    </v-table>

    <VPageNavigation
      :current-page="currentPage"
      :total-page="totalPage"
      @page-change="onPageChange"
      :navigation-size="5"
    ></VPageNavigation>
  </div>
</template>

<style scoped>
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
</style>

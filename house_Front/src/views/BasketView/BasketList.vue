<script setup>
import PageNavigation from "../../components/navigation/PageNavigation.vue";
import SearchBar from "../../components/SearchBar.vue";
import { RouterLink, useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useBasketStore } from "../../stores/basket";
import { useAuthStore } from "../../stores/auth";
import { useHouseStore } from "../../stores/house";
import { reformLists } from "@/utils/tools";

const basketStore = useBasketStore();
const authStore = useAuthStore();
const houseStore = useHouseStore();

const basketList = computed(() => basketStore.basketList);
const totalPageCount = computed(() => basketStore.totalPageCount);

const reformBasketList = computed(() => reformLists(basketList.value));

const router = useRouter();

const params = ref({
  key: "", //조건 검색 시 컬럼명
  word: "", //해당 컬럼에 일치하는 데이터
  pgno: 1, //조회할 페이지 번호
  spp: 30, //한번에 얻어올 게시글 개수
});

const userId = computed(() => authStore.user.userId);

// 목록 조회
basketStore.getMyBasket(userId.value, params.value);

const moveDetail = (userId, aptCode) => {
  router.push({ name: "house-detail", params: { aptCode } });
};

const changePage = (pageNum) => {
  params.value.pgno = pageNum;

  // 목록 조회 필요
  basketStore.getMyBasket(userId, params.value);
};

const deleteBasket = async (userId, aptCode) => {
  if (!confirm("정말 삭제하시겠습니까?")) return;
  basketStore.deleteBasket(userId, aptCode);
  console.log("what!!!! : " + userId + " " + aptCode);
  location.reload();
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
                  <h3 class="tit">장바구니 목록</h3>
                  <div class="pg_text">현재 장바구니에 저장된 목록입니다</div>
                  <div class="packageBox act" id="packageBox">
                    <!-- for문 반복 -->
                    <div
                      class="itemWrap"
                      v-for="baskets in reformBasketList"
                      :key="baskets[0].aptCode"
                    >
                      <div
                        class="basket-item item"
                        v-for="basket in baskets"
                        :key="basket.aptCode"
                        @click="houseStore.moveDetail(basket.aptCode)"
                      >
                        <input
                          :id="basket.aptCode"
                          type="checkbox"
                          name="privPackCd"
                        />
                        <label :for="basket.aptCode">
                          <div class="img">
                            <img :src="generateImagePath()" alt="집집집" />
                          </div>
                          <div class="food-info">
                            <div class="name-area">
                              <p class="name" :price="basket.price">
                                {{ basket.apartmentName }}
                              </p>

                              <p class="price">
                                <em>{{ basket.price }}</em>
                                <span>원</span>
                              </p>
                            </div>

                            <ul class="dot_list">
                              <li>소유주 : {{ basket.userId }}</li>
                              <li>{{ basket.sidoName }}</li>
                              <li>{{ basket.gugunName }}</li>
                              <li>{{ basket.dongName }}</li>
                              <li>{{ basket.roadName }}</li>
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
      <form id="mainForm"></form>
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

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

.scroll {
  overflow: hidden;
}

.basket-item:hover {
  background-color: rgb(255, 231, 165);
}

.fdLayer {
  display: none;
  position: absolute;
  left: 50%;
  height: auto;
  background-color: #fff;
  border: 5px solid rgb(0, 66, 101);
  z-index: 10;
}
.fdLayer .fdContainer {
  padding: 3px;
}
.fdLayer .fdBtn {
  width: 100%;
  margin: 10px 0 0;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  text-align: right;
}
a.closeBtn {
  display: inline-block;
  height: 25px;
  padding: 0 14px 0;
  border: 1px solid #304a8a;
  background-color: rgb(0, 32, 61);
  font-size: 13px;
  color: #fff;
  line-height: 25px;
}
a.closeBtn:hover {
  border: 1px solid #091940;
  background-color: #1f326a;
  color: #fff;
}
#mask {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  background-color: #000;
  display: none;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #dddddd;
  text-align: center; /* 가운데 정렬을 추가합니다. */
  padding: 8px;
}
.basket-item:hover {
  background-color: rgb(255, 231, 165);
}
</style>

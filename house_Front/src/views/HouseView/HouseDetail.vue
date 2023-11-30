<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import axios from "axios";
import { useAuthStore } from "../../stores/auth";
import { useHouseStore } from "../../stores/house";
import KakaoMap from "../../components/common/KakaoMap.vue";
import { truncateDecimals } from "@/utils/tools";

const authStore = useAuthStore();
const userId = computed(() => authStore.user.userId);
const houseStore = useHouseStore();
const house = computed(() => houseStore.houseInfo);
const router = useRouter();
const route = useRoute();

console.log("현재 라우트 정보:", route);

houseStore.getHouseInfo(route.params.aptCode);

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
    <!-- <link rel="stylesheet" href="@/assets/static/pc/dist/megabox.min.css" media="all" /> -->
    <body>
      <div class="body-wrap" style="overflow: hidden">
        <div class="container">
          <div id="contents" class="pt00">
            <div class="private2022">
              <div class="inner-wrap">
                <div class="packageArea">
                  <h3 class="tit">매물 상세</h3>
                  <div class="pg_text">
                    현재 보고 있는 매물의 상세 정보입니다
                  </div>
                  <div class="packageBox act" id="packageBox">
                    <!-- for문 반복 -->
                    <div class="itemWrap">
                      <div
                        class="basket-item item_custom"
                        @click="houseStore.moveDetail(house.aptCode)"
                      >
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

                            <ul>
                              <li>아파트 코드: {{ house.aptCode }}</li>
                              <li>건축년도: {{ house.buildYear }}</li>
                              <li>도로명: {{ house.roadName }}</li>
                              <li>도로명 본번: {{ house.roadNameBonbun }}</li>
                              <li>도로명 부번: {{ house.roadNameBubun }}</li>
                              <li>도로명 일련번호: {{ house.roadNameSeq }}</li>
                              <li>
                                도로명 지하 부호:
                                {{ house.roadNameBasementCode }}
                              </li>
                              <li>도로명 코드: {{ house.roadNameCode }}</li>
                              <li>동: {{ house.dong }}</li>
                              <li>본번: {{ house.bonbun }}</li>
                              <li>부번: {{ house.bubun }}</li>
                              <li>시군구 코드: {{ house.sigunguCode }}</li>
                              <li>읍면동 코드: {{ house.eubmyundongCode }}</li>
                              <li>동 코드: {{ house.dongCode }}</li>
                              <li>토지 코드: {{ house.landCode }}</li>
                              <li>아파트명: {{ house.apartmentName }}</li>
                              <li>지번: {{ house.jibun }}</li>
                              <li>위도 (Latitude): {{ house.lat }}</li>
                              <li>경도 (Longitude): {{ house.lng }}</li>
                              <li>소유주 (owner): {{ house.ownerId }}</li>
                              <li>가격 (price): {{ house.price }}</li>
                            </ul>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div class="table-map-container">
                      <KakaoMap
                        :x="truncateDecimals(house.lat, 4)"
                        :y="truncateDecimals(house.lng, 4)"
                        class="kakao-map rounded-corner"
                      />
                    </div>
                  </div>
                </div>

                <!-- 구매 button -->
                <button
                  class="btnCls"
                  @click="
                    houseStore.buyHouse(userId, house.aptCode, house.ownerId)
                  "
                >
                  구매
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
</template>

<style scoped>
@import url("@/assets/static/pc/dist/megabox.min.css");
.basket-item:hover {
  background-color: rgb(144, 0, 255);
}

/* 테이블과 지도를 감싸는 컨테이너 스타일링 */
.table-map-container {
  display: flex;
  justify-content: space-between;
}

/* KakaoMap 컴포넌트 스타일링 */
.kakao-map {
  width: 720px; /* 가로 크기 조절 */
  height: 720px; /* 세로 크기 조절 */
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

.rounded-corner {
  border-radius: 30px; /* 둥근 모서리의 반지름 값 설정 */
  overflow: hidden; /* 모서리 이외의 부분을 감추기 위한 설정 */
}

.dot_list_custom li {
  position: relative;
  padding-top: 8px;
  padding-left: 7px;
  line-height: 16px;
  letter-spacing: -0.01em;
  font-size: 14px;
  color: #666;
  font-weight: 400;
}

.dot_list_custom li:first-child {
  padding-top: 0;
}
.dot_list_custom li:first-child:after {
  top: 5px;
}
.dot_list_custom li:after {
  position: absolute;
  top: 13px;
  left: 0;
  content: "";
  width: 3px;
  height: 3px;
  background-color: #666;
}

.item_custom {
  position: relative;
  width: 356px;
  height: 720px;
  margin-right: 16px;
  border-radius: 10px;
}
.item_custom:last-child {
  margin-right: 0;
}
.item_custom input {
  display: none;
}
.item_custom label {
  display: block;
  position: relative;
}
.item_custom label:after {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 29px;
  height: 28px;
  content: "";
  z-index: 2;
  background-size: 28px 28px;
}
.private2022
  .packageArea
  .packageBox
  .itemWrap
  .item_custom
  input:checked
  + label:after {
  background: url(https://img.megabox.co.kr/static/pc/images/reserve/checkbox_on.png)
    no-repeat;
  background-size: 28px 28px;
}
.private2022 .packageArea .packageBox .itemWrap .item_custom .img {
  width: 100%;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
}
.private2022 .packageArea .packageBox .itemWrap .item_custom .img img {
  display: block;
  width: 100%;
}
.private2022 .packageArea .packageBox .itemWrap .item_custom .food-info {
  display: block;
  width: 100%;
  min-height: 189px;
  padding: 0 0 0 20px;
  border: 1px solid #e4e4e4;
  border-width: 0 1px 1px 1px;
  border-radius: 0 0 10px 10px;
}
.private2022
  .packageArea
  .packageBox
  .itemWrap
  .item_custom
  .food-info
  .name-area {
  position: relative;
  border-bottom: 1px solid #e4e4e4;
  letter-spacing: -0.01em;
}
.private2022
  .packageArea
  .packageBox
  .itemWrap
  .item_custom
  .food-info
  .name-area
  .name {
  padding: 23px 0 19px;
  font-size: 18px;
  line-height: 21px;
}
.private2022
  .packageArea
  .packageBox
  .itemWrap
  .item_custom
  .food-info
  .name-area
  .price {
  position: absolute;
  top: 5px;
  right: 16px;
}
.private2022
  .packageArea
  .packageBox
  .itemWrap
  .item_custom
  .food-info
  .name-area
  .price
  em {
  display: inline-block;
  line-height: 55px;
  font-family: Roboto;
  font-weight: 400;
  font-size: 1.6em;
  vertical-align: middle;
  color: #ddbc2b;
}
.private2022
  .packageArea
  .packageBox
  .itemWrap
  .item_custom
  .food-info
  .name-area
  .price
  span {
  display: inline-block;
  line-height: 53px;
  padding: 2px 0 0 0;
  font-size: 1.3333em;
  vertical-align: middle;
}
.private2022
  .packageArea
  .packageBox
  .itemWrap
  .item_custom
  .food-info
  .dot_list {
  display: flex;
  flex-wrap: wrap;
  padding: 8px 0 20px;
}
.private2022
  .packageArea
  .packageBox
  .itemWrap
  .item_custom
  .food-info
  .dot_list
  li {
  width: 50%;
}
.private2022
  .packageArea
  .packageBox
  .itemWrap
  .item_custom
  .food-info
  .dot_list
  li:after {
  background-color: #aaa;
}
.private2022
  .packageArea
  .packageBox
  .itemWrap
  .item_custom
  .food-info
  .dot_list
  li:first-child {
  padding-top: 8px;
}
.private2022
  .packageArea
  .packageBox
  .itemWrap
  .item_custom
  .food-info
  .dot_list
  li:first-child:after {
  top: 13px;
}
.private2022
  .packageArea
  .packageBox
  .itemWrap
  .item_custom
  .food-info
  .dot_list
  li.none:after {
  background: 0 0;
}
.private2022
  .packageArea
  .packageBox
  .itemWrap
  .item_custom
  .food-info
  .dot_list.w100
  li {
  width: 100%;
}
.private2022 .packageArea .packageBox .itemWrap.v2 {
  margin-left: -40px;
  position: relative;
}
.private2022 .packageArea .packageBox .itemWrap.v2 .item_custom {
  margin-left: 40px;
  margin-right: 0;
}

.private2022 .packageArea .packageBox.act {
  display: flex;
  height: auto;
}

.private2022 .packageArea .packageBox .itemWrap {
  display: flex;
  margin-top: 0px;
}

.private2022 .packageArea .packageBox {
  display: flex;
  padding-top: 25px;
  height: 408px;
  overflow: hidden;
  justify-content: space-between;
}

button.btnCls {
  display: block;
  width: 120px;
  height: 36px;
  margin: 20px auto 40px;
  border: 1px solid #ddbc2b;
  border-radius: 5px;
  color: #ddbc2b;
  font-size: 15px;
  text-align: center;
  outline: 0;
  background: #fff;
}
</style>

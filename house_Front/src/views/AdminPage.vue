<script setup>
import axios from "axios";
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useHouseStore } from "@/stores/house";
import { useRouter } from "vue-router";
import { numberWithCommas } from "@/utils/tools";

const router = useRouter();

const showCashCharge = ref(false);
const cashAmount = ref(0);
const authStore = useAuthStore();
const houseStore = useHouseStore();

const userInfo = computed(() => authStore.user);
console.log("userInfo : ", userInfo.value.userId);
const myHouseList = computed(() => houseStore.myHouseList);

const rechargeList = ref([]);
const checkedList = ref([]);

const getRechargeList = async () => {
  try {
    const response = await axios.get(`/api/member/getRechargeList`);
    console.log("response", response.data);
    rechargeList.value = response.data;
    console.log("충전리스트 조회 결과", rechargeList.value);
  } catch (error) {
    console.log(error);
  }
};
getRechargeList();

const getRecharge = async () => {
  console.log(checkedList.value);
  try {
    await axios.post(`/api/member/acceptRecharge`, checkedList.value);
    getRechargeList();
    alert("반영 완료");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div id="contents" class="pt00">
    <div class="private2022">
      <div class="inner-wrap">
        <div class="packageArea">
          <form @submit.prevent="getRecharge">
            <div class="container">
              <div id="contents">
                <div class="inner-wrap">
                  <div class="pointUse" id="pointUse">
                    <h3 class="tit">충전 신청 내역</h3>

                    <table>
                      <colgroup>
                        <col style="width: 250px" />
                        <col style="width: 250px" />
                        <col style="width: 250px" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>순번</th>
                          <th>사용자 계정</th>
                          <th>충전액</th>
                          <th>수락</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="recharge in rechargeList" :key="recharge.rechargeId">
                          <td>{{ recharge.rechargeId }}</td>
                          <td>{{ recharge.userId }}</td>
                          <td>{{ numberWithCommas(recharge.amount) }} 원</td>
                          <td>
                            <input
                              v-model="checkedList"
                              type="checkbox"
                              name="userIdList"
                              :value="{
                                rechargeId: recharge.rechargeId,
                                userId: recharge.userId,
                                rechargeAmount: recharge.amount,
                              }"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="table_custom">
                      <button class="approveButton" type="button" @click="getRecharge()">충전 승인</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div id="contents" class="pt00">
            <div class="private2022 top_custom">
              <div class="inner-wrap">
                <div class="paymentBox">
                  <div class="payment">
                    <div class="total">
                      내 아이디<span
                        ><em>{{ userInfo.userId }}</em
                        >님</span
                      >
                    </div>
                    <div class="total">
                      보유 매물 총 가치<span><em></em>{{ numberWithCommas(userInfo.totalAssetPrice) }}원</span>
                    </div>
                    <div class="total">
                      보유 현금<span
                        ><em>{{ numberWithCommas(userInfo.rechargeAmount) }}</em
                        >원</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!DOCTYPE html>
  <html lang="ko">
    <body>
      <div class="body-wrap" style="overflow: hidden">
        <div class="container">
          <div id="contents" class="pt00">
            <div class="private2022">
              <div class="inner-wrap">
                <div class="packageArea">
                  <h3 class="tit">보유 매물</h3>
                  <div class="pg_text">현재 보유한 매물입니다!</div>
                  <div class="packageBox act" id="packageBox">
                    <!-- for문 반복 -->
                    <div class="itemWrap" v-for="houses in reformMyHouses" :key="houses[0].aptCode">
                      <div
                        class="basket-item item"
                        v-for="house in houses"
                        :key="house.aptCode"
                        @click="houseStore.moveDetail(house.aptCode)"
                      >
                        <input :id="house.aptCode" type="checkbox" name="privPackCd" />
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
                                <em>{{ numberWithCommas(house.price) }}</em>
                                <span>원</span>
                              </p>
                            </div>

                            <ul class="dot_list">
                              <li>{{ house.sidoName }}</li>
                              <li>{{ house.gugunName }}</li>
                              <li>{{ house.dong }}</li>
                              <li>{{ house.roadName }}</li>
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

.table_custom {
  display: flex;
}

.approveButton {
  padding: 7px 7px;
  margin: 10px 0px 35px auto; /* 수정된 부분: margin-left를 auto로 설정하여 오른쪽으로 이동 */
  border-radius: 10px;
  background-color: #ffe051;
  color: #222;
  cursor: pointer;
  z-index: 2;
  text-align: center;
  justify-content: center;
}
</style>

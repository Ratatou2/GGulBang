<script setup>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useHouseStore } from "@/stores/house";
import { reformLists } from "@/utils/tools";
import { numberWithCommas } from "@/utils/tools";

const showCashCharge = ref(false);
const cashAmount = ref(0);
const authStore = useAuthStore();
const houseStore = useHouseStore();

const userInfo = computed(() => authStore.user);
const tempUserInfo = ref(null);
console.log("userInfo : ", userInfo.value.userId);
const myHouseList = computed(() => houseStore.myHouseList);

// const reloadUserInfo = () => {
//   console.log("들어있는게 있긴하냐? ", userInfo.value);
//   const temp = authStore.getUserInfo(userInfo.value);
//   console.log("유저정보 새로로래소롤", temp.value);
//   return temp;
// };

// onMounted(() => {
//   reloadUserInfo(); // 페이지 새로 고침 할 때마다 정보 가져오기 (업데이트)
// });

const reformMyHouses = computed(() => reformLists(myHouseList.value));
console.log("myHouse", myHouseList);
houseStore.getMyHouseList(userInfo.value.userId);

console.log(myHouseList.value);
console.log(userInfo.value);

const toggleCashCharge = () => {
  showCashCharge.value = !showCashCharge.value;
};

const rechargeForm = ref({
  userId: "",
  amount: "",
});

const chargeCash = async () => {
  try {
    rechargeForm.value.userId = userInfo.value.userId;
    rechargeForm.value.amount = cashAmount.value;
    await axios.post(`/api/member/recharge`, rechargeForm.value);
    alert("충전 신청 완료");
  } catch (error) {
    alert("충전 신청 실패");
  }
  cashAmount.value = 0;
  location.reload();
};

const clearPlaceholder = () => {
  // 클릭 시 0이면 빈 문자열로 변경
  if (cashAmount.value === 0) {
    cashAmount.value = "";
  }
};

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 19) + 1;
};
console.log(import.meta.url);
const generateImagePath = () => {
  return `/assets/static/pc/images/reserve/private2022_${generateRandomNumber()}.jpg`;
};

const rechargeAmount = ref(0);
const totalAssetPrice = ref(0);
const refreshInfo = async () => {
  try {
    const response = await axios.get(`/api/member/refresh`, {
      params: {
        userId: userInfo.value.userId,
      },
    });
    console.log("response", response);
    rechargeAmount.value = response.data.rechargeAmount;
    totalAssetPrice.value = response.data.totalAssetPrice;
  } catch (error) {
    console.log(error);
  }
};
refreshInfo();
</script>

<template>
  <div id="contents" class="pt00">
    <div class="private2022">
      <div class="inner-wrap">
        <div class="packageArea">
          <h3 class="tit">내 정보</h3>
          <div class="pg_text">
            현재 사용자의 정보입니다 (<button @click.stop="toggleCashCharge">현금 충전</button>)
            <a class="reset-password-link" href="/updatePassword">비밀번호 재설정</a>
          </div>
          <!-- 현금 충전 입력 폼 -->
          <div v-if="showCashCharge">
            <input
              type="number"
              v-model="cashAmount"
              @keyup.enter="chargeCash"
              placeholder="충전할 금액"
              @focus="clearPlaceholder"
            />
            <button @click.stop="chargeCash()">충전</button>
          </div>
        </div>
        <div class="container">
          <div id="contents" class="pt00">
            <div class="private2022">
              <div class="inner-wrap">
                <div class="paymentBox">
                  <div>
                    <div class="payment">
                      <div class="total">
                        내 아이디<span
                          ><em>{{ userInfo.userId }}</em
                          >님</span
                        >
                      </div>
                      <div class="total">
                        보유 매물 총 가치<span><em></em>{{ numberWithCommas(totalAssetPrice) }}원</span>
                      </div>
                      <div class="total">
                        보유 현금<span
                          ><em>{{ numberWithCommas(rechargeAmount) }}</em
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
.packageArea {
  display: flex;
  flex-direction: column;
}

.pg_text {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.reset-password-link {
  margin-left: auto; /* 비밀번호 재설정 링크를 오른쪽 끝으로 이동 */
}
/* LAYER POPUP STYLE END */
</style>

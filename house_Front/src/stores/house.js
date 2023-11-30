import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { RouterLink, useRouter } from "vue-router";

export const useHouseStore = defineStore("house", () => {
  const router = useRouter();
  
  const houseList = ref({}); // 매물 목록
  const myHouseList = ref({}); // 내 매물 목록
  const totalPageCount = ref(0); //전체 페이지 개수

  // 매물 목록
  const getHouseList = async (params) => {
    const { data } = await axios.get(`/api/house`, {
      params: params,
    });

    console.log("getHouseList(params) 응답데이터:", data);
    houseList.value = data;
    totalPageCount.value = data.totalPageCount;
  };

  // 매물 상세
  const houseInfo = ref({});
  const getHouseInfo = async (aptCode) => {
    const { data } = await axios.get(`/api/house/detail/${aptCode}`);
    console.log(`getHouseInfo(${aptCode}) 요청 응답: `, data);
    houseInfo.value = data;
  };

  // 매물 구매
  const buyHouse = async (userId, aptCode, ownerId) => {
    console.log("입력값 : ", userId, aptCode, ownerId);

    // 소유주가 없는 경우, 구매 불가
    if (ownerId == null) {
      alert("구매할 수 없는 매물입니다!!!!");
      return;
    }

    // 자기 자신의 매물은 구매 불가
    if (userId == ownerId) {
      alert("자신의 매물은 구매할 수 없습니다!!!!");
      return;
    }

    const result = await axios.put(`/api/house`, {
      userId: userId,
      aptCode: aptCode,
      ownerId: ownerId,
    });

    if ((result.data = 1)) {
      console.log("구매 정상 처리 성공 : ", result);
      alert("정상 구매 완료!");
    } else {
      console.log("구매 정상 처리 실패 : ", result);
      alert("정상 구매 실패!");
    }
    console.log(result + " " + ownerId);
    location.reload();
  };

  // 내 매물 리스트
  const getMyHouseList = async (userId) => {
    const { data } = await axios.get(`/api/house/user/${userId}`);
    console.log(`getMyHouseList(${userId}) 요청 응답: `, data);
    myHouseList.value = data;
  };
  
  // 매물 상세 뷰 이동
  const moveDetail = (aptCode) => {
    router.push({ name: "house-detail", params: { aptCode } });
  };

  // // 매물 등록
  // const addBasket = async (addBasketForm) => {
  //   console.log("addBasket() 요청 데이터:", addBasketForm);
  //   return await axios.post(`/api/basket`, addBasketForm);
  // };

  // // 매물 삭제
  // const deleteBasket = async (userId, aptCode) => {
  //   console.log(`deleteBasket(${userId}/${aptCode}) 요청 보냄`);
  //   return await axios.delete(`/api/basket/${userId}/${aptCode}`);
  // };

  return {
    houseList,
    getHouseList,
    houseInfo,
    getHouseInfo,
    buyHouse,
    myHouseList,
    moveDetail,
    getMyHouseList,
  };
});

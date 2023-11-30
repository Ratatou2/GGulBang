import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

export const useBasketStore = defineStore("basket", () => {
  // 장바구니 목록
  const basketList = ref({}); //목록 데이터
  const totalPageCount = ref(0); //전체 페이지 개수

  const authStore = useAuthStore();
  const userId = computed(() => authStore.user.userId);

  const getMyBasket = async (userId, params) => {
    const { data } = await axios.get(`/api/basket/${userId}`, {
      params: params,
    });

    console.log("getMyBasket(params) 응답데이터:", data);
    console.log(data.basketList);
    basketList.value = data;
    totalPageCount.value = data.totalPageCount;
  };

  // 장바구니 상세
  const basketInfo = ref({});
  const getBasketInfo = async (userId, aptCode) => {
    const { data } = await axios.get(`/api/basket/${userId}/${aptCode}`);
    console.log(`getBasketInfo(${userId}/${aptCode}) 요청 응답: `, data);
    basketInfo.value = data;
  };

  // 장바구니 등록
  const addBasket = async (addBasketForm) => {
    console.log("addBasket() 요청 데이터:", addBasketForm);
    return await axios.post(`/api/basket`, addBasketForm);
  };
  
  // 장바구니 삭제
  const deleteBasket = async (userId, aptCode) => {
    console.log(`deleteBasket(${userId}/${aptCode}) 요청 보냄`);
    return await axios.delete(`/api/basket/${userId}/${aptCode}`);
  };
  
  //   // 게시글 수정
  //   const modifyArticle = async (modifyForm) => {
  //     console.log("modifyArticle() 요청 데이터:", modifyForm);
  //     return await axios.put(`/api/board`, modifyForm);
  //   };

  return {
    basketList,
    totalPageCount,
    getMyBasket,
    basketInfo,
    getBasketInfo,
    addBasket,
    deleteBasket,
  };
});

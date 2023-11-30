<script setup>
import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();

const sidoList = ref([]);
const getSidoList = async () => {
  axios
    .get("http://localhost/api/house/sidoList")
    .then((response) => {
      sidoList.value = response.data;
      console.log("response", response);
      console.log(sidoList);
    })
    .catch((error) => {
      console.log(error);
    });
};
getSidoList();

const gugunList = ref([]);
const getGugunList = () => {
  console.log("등록폼", registForm);
  //구군 및 동 정보 초기화
  registForm.value.selectedGugun = ""; //선택된 구군정보 초기화
  registForm.value.selectedDong = ""; //선택된 동정보 초기화
  dongList.value = []; //동 목록 초기화

  axios
    .get(
      `http://localhost/api/house/gugunList/${registForm.value.selectedSido}`
    )
    .then((response) => {
      gugunList.value = response.data;
      console.log("response", response);
      console.log(gugunList);
    })
    .catch((error) => {
      console.log(error);
    });
};

const dongList = ref([]);
const getDongList = async () => {
  registForm.value.selectedDong = ""; //선택된 동정보 초기화
  try {
    const response = await axios.get(`http://localhost/api/house/dongList`, {
      params: {
        sidoName: registForm.value.selectedSido,
        gugunName: registForm.value.selectedGugun,
      },
    });

    dongList.value = response.data;
    console.log("response", response);
    console.log(dongList);
  } catch (error) {
    console.log(error);
  }
};

const registForm = ref({
  userId: authStore.user.userId,
  selectedSido: "",
  selectedGugun: "",
  selectedDong: "",
  roadName: ref(""),
  apartmentName: ref(""),
  price: ref(""),
});

const regist = async () => {
  //유효성 검증

  try {
    await axios.post(`http://localhost/api/house`, registForm.value);
    alert("등록성공");
    router.push({ path: "/house/list" });
  } catch (error) {
    alert("등록실패");
  }
};
</script>

<template>
  <div>
    <h1>추가페이지입니다.</h1>
    <form @submit.prevent="regist">
      <h1>지역을 입력해주세요</h1>
      <select
        id="sido"
        @change="getGugunList"
        v-model="registForm.selectedSido"
      >
        <option value="" disabled>시/도 선택</option>
        <option v-for="sido in sidoList" @click="cleargd">{{ sido }}</option>
      </select>

      <select
        id="gugun"
        @change="getDongList"
        v-model="registForm.selectedGugun"
      >
        <option value="" disabled>구/군 선택</option>
        <option v-for="gugun in gugunList">{{ gugun }}</option>
      </select>

      <select id="dong" v-model="registForm.selectedDong">
        <option value="" disabled>동 선택</option>
        <option v-for="dong in dongList">{{ dong }}</option>
      </select>
      <hr />

      <label for="roadName">도로명주소</label>
      <input id="roadName" type="text" v-model="registForm.roadName" />
      <br />
      <label for="aptName">아파트 명</label>
      <input
        id="aptName"
        type="text"
        v-model="registForm.apartmentName"
      /><br />
      <label for="price">가격</label>
      <input id="price" type="text" v-model="registForm.price" />

      <button>추가하기</button>
    </form>
  </div>
</template>

<style scoped></style>

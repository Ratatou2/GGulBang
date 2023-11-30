import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore(
  "auth",
  () => {
    //login User의 정보
    const user = ref({
      userId: "",
      userName: "",
      role: "",
      rechargeAmount: "",
      totalAssetPrice: "",
    });
    const token = ref(""); //jwt 토큰 정보W

    const login = async (loginForm) => {
      console.log(loginForm);
      const { data } = await axios.post(`/api/member/login`, loginForm);
      console.log("로그인 요청 후 응답 데이터:", data);

      token.value = data.token; //토큰 정보 저장

      const decoded = jwtDecode(data.token); //토큰에서 유저정보 추출하여 유저정보 저장
      console.log("디코딩된 토큰 정보 :", decoded);
      user.value.userId = decoded.userId;
      user.value.userName = decoded.userName;
      user.value.role = decoded.role;
      user.value.rechargeAmount = decoded.rechargeAmount;
      user.value.totalAssetPrice = decoded.totalAssetPrice;
    };

    const logout = () => {
      clearUser();
    };

    const clearUser = () => {
      user.value.userId = "";
      user.value.userName = "";
      user.value.role = "";
      user.value.rechargeAmount = "";
      user.value.totalAssetPrice = "";
      token.value = "";
    };

    const resetPassword = async (resetForm) => {
      console.log(resetForm);
      const { data } = await axios.post(`/api/member/resetPassword`, resetForm);
      console.log("비밀번호 초기화 요청 후 응답 데이터:", data);

      console.log(data.value);
    };

    const updatePassword = async (updateForm) => {
      console.log("auth - updatePassword : ", updateForm);
      const { data } = await axios.post(`/api/member/updatePassword`, updateForm);
      console.log("비밀번호 업데이트 요청 후 응답 데이터:", data);

      console.log(data.value);
    };

    const getUserInfo = async (infoForm) => {
      console.log("auth - userInfo : ", infoForm);
      const { data } = await axios.get(`/api/member/getUserInfo`, {
        params: infoForm,
      });
      console.log("유저 데이터 요청 후 응답 데이터:", data.value);
      // 여기서 받아온 정보로 현 페이지 유저 정보 업데이트 하면 됨
    };

    return { user, token, login, logout, clearUser, resetPassword, updatePassword, getUserInfo };
  },

  //새로고침시 데이터 유지를 위한 설정(localStorage에 저장해서 불러오는 방식)
  {
    persist: true,
  }
  //sessionStorage 사용하고 싶은 경우
  // {
  //   persist: {
  //     storage: sessionStorage,
  //   },
  // }
);

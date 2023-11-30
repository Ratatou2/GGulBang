<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const isModalOpen = ref(false);
const router = useRouter();

const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
  router.push("/house/list");
};

openModal();
</script>

<template>
  <button @click="openModal" hidden>모달 열기</button>

  <!-- 모달 컴포넌트 -->
  <div v-if="isModalOpen" class="modal">
    <div class="modal-content">
      <!-- 모달 내용 -->
      <iframe src="http://localhost:3000" width="800" height="700"></iframe>
      <div display="flex">
        <button @click="closeModal" class="chat_button_custom">모달 닫기</button>
      </div>
    </div>
  </div>
</template>

<style>
/* 모달 스타일링 (예시) */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}

.chat_button_custom {
  display: flex;
  margin-left: auto;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  background-color: rgb(255, 212, 72);
  color: #000000;
  cursor: pointer;
  z-index: 2;
}
</style>

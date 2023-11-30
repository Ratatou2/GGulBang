<script setup>
import { computed } from "vue";

const props = defineProps({ currentPage: Number, totalPage: Number });
const emit = defineEmits(["pageChange"]);

const navigationSize = parseInt(import.meta.env.VITE_ARTICLE_NAVIGATION_SIZE);

const startPage = computed(() => {
  return parseInt((props.currentPage - 1) / navigationSize) * navigationSize + 1;
});

const endPage = computed(() => {
  let lastPage = parseInt((props.currentPage - 1) / navigationSize) * navigationSize + navigationSize;
  console.log("props : ", props);
  return props.totalPage < lastPage ? props.totalPage : lastPage;
});

const endRange = computed(() => {
  return parseInt((props.totalPage - 1) / navigationSize) * navigationSize < props.currentPage;
});

function range(start, end) {
  const list = [];
  for (let i = start; i <= end; i++) list.push(i);
  return list;
  //   return Array(end - start + 1)
  //     .fill()
  //     .map((val, i) => start + i);
}

function onPageChange(pg) {
  console.log(pg + "로 이동!!!");
  emit("pageChange", pg);
}
</script>

<template>
  <div class="row">
    <ul class="ul_custom pagination justify-content-center">
      <li class="page-item button_color_outer">
        <a class="page-link" @click="onPageChange(1)">처음</a>
      </li>
      <li class="page-item button_color_inner">
        <a class="page-link" @click="onPageChange(startPage == 1 ? 1 : startPage - 1)">이전</a>
      </li>
      <template v-for="pg in range(startPage, endPage)" :key="pg">
        <li :class="currentPage === pg ? 'page-item active' : 'page-item'">
          <a class="page-link" @click="onPageChange(pg)">{{ pg }}</a>
        </li>
      </template>
      <li class="page-item button_color_inner">
        <a class="page-link" @click="onPageChange(endRange ? totalPage : endPage + 1)">다음</a>
      </li>
      <li class="page-item button_color_outer">
        <a class="page-link" @click="onPageChange(totalPage)">마지막</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
a {
  cursor: pointer;
}
ul {
  margin-top: 40px;
  margin-bottom: 80px;
  display: flex;
  flex-direction: row;
  list-style-type: none;
}
li {
  border-radius: 10px;
  padding: 10px;
  border-radius: 40px;
  margin-right: 30px; /* 간격 조절 */
}
.ul_custom {
  align-content: space-between;
}

.row {
  border-radius: 20px;
}

.button_color_inner {
  background-color: rgb(255, 220, 107);
}
.button_color_outer {
  background-color: rgb(255, 236, 174);
}
</style>

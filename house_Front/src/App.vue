<script setup>
import HeaderView from "@/components/HeaderView.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
console.log(route.params);
console.log(router.params);

// location.href = "/Main/Main_html5/index.html";
</script>

<template>
  <HeaderView />
  <!-- <header>
    채팅 테스트 (소켓)
    <ul>
      <li>
        <RouterLink to="/chat">채팅</RouterLink>
      </li>
      <li>
        <RouterLink to="/chat2">채팅2</RouterLink>
      </li>
      <li>
        <RouterLink to="/chat3">채팅3</RouterLink>
      </li>
      <li>
        <RouterLink to="/chat4">채팅3</RouterLink>
      </li>
    </ul>
  </header> -->
  <!-- <main>
    <RouterView></RouterView>
  </main> -->
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

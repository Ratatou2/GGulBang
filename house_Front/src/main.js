import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { io } from "socket.io-client";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; //새로고침시 데이터 유지를 위한 설정

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { loadFonts } from "./plugins/webfontloader";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); //새로고침시 데이터 유지를 위한 설정

// app.config.globalProperties.$socket = io("http://localhost:3000");
loadFonts();

app.use(vuetify);
app.use(pinia);
app.use(router);

app.mount("#app");

import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost",

        // 직접 공공 데이터를 가져오는 경우, origin 변경을 위해 쓰면 됨
        // changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""), // /api를 ""으로 대체하는 셈
        // 걍 문자 그대로 앞 주소를 지우고 링크를 바꿔버린다~
        // 정규식은 추후에 공부하세요
      },
      // "/socket": {
      //   target: "http://localhost:3000",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/socket/, ""),

      //   // 직접 공공 데이터를 가져오는 경우, origin 변경을 위해 쓰면 됨
      //   // changeOrigin: true,
      //   // rewrite: (path) => path.replace(/^\/api/, ""), // /api를 ""으로 대체하는 셈
      //   // 걍 문자 그대로 앞 주소를 지우고 링크를 바꿔버린다~
      //   // 정규식은 추후에 공부하세요
      // },
    },
  },
  // 이걸 안 해주면 멍청한 socketJS가 자꾸 global 정의 안됐다고 징징댐
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
});

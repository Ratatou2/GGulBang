<template>
  <div>
    <ul>
      <h3 id="welcomeText">메세지 좀 돼라 빌어먹을 소켓</h3>
      <h3 id="roomName" hidden></h3>
      <li v-for="message in messages" :key="message.id">
        {{ message.text }}
      </li>
    </ul>
    <input
      v-model="messageInput"
      @keyup.enter="sendMessage"
      placeholder="메시지를 입력하세요"
    />
    <button @click="showRoom">what</button>
    <ul id="chatList"></ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // 이 주소랑 main.js에 있는거, 현재 주소 맞춰줘야 함
const messages = ref([]);
const messageInput = ref("");
const roomName = ref("");

console.log(socket);

const addMessage = (message) => {
  console.log("메세지를 추가한다앗!!!");

  const ul = document.getElementById("chatList");
  const li = document.createElement("li");

  li.innerText = message;
  ul.appendChild(li);
};

const sendMessage = () => {
  console.log("메세지를 보낸다핫!");
  event.preventDefault();

  const meesageText = messageInput.value;

  socket.emit("chat message", messageInput.value);

  socket.emit("new_message", meesageText, roomName, () => {
    addMessage(`You: ${meesageText}`);
  });

  console.log(meesageText);

  messageInput.value = "";
};

const showRoom = () => {
  const roomNameH3 = document.getElementById("roomName");

  document.getElementById("welcomeText").hidden = true;
  roomNameH3.hidden = false;
  roomNameH3.innerText = `[Room Name] : ${roomName}`;
};

const roomSubmit = (event) => {
  event.preventDefault();
};

socket.on("welcome", (user) => {
  addMessage(`${user} arrived!`);
});

socket.on("bye", (left) => {
  addMessage(`${left} left ㅠㅠ`);
});
</script>

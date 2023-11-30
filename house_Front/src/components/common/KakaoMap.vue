<script setup>
import { onMounted, ref, toRefs } from "vue";

//지도
const container = ref(null); //<div id="map"> 엘리먼트 객체
const map = toRefs(null); //kakaoMap 객체

const props = defineProps({
  x: {
    type: Number,
    default: 33.2547,
  },
  y: {
    type: Number,
    default: 126.43008,
  },
});

console.log("좌표값? : ", props.x, props.y);
//최초에 javascript 파일 가져올 때만 실행될 메소드
const loadScript = () => {
  const script = document.createElement("script");
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY}&autoload=false`;
  script.onload = () => kakao.maps.load(loadMap);
  document.head.appendChild(script);
};

//지도 불러오는 메소드
// const loadMap = (x = 33.2547, y = 126.43008) => {
const loadMap = () => {
  console.log("지도 좌표요~ ", props.x, props.y);

  //1.지도 출력1
  const options = {
    center: new kakao.maps.LatLng(props.x, props.y),
    level: 3,
  };
  map.value = new kakao.maps.Map(container.value, options);

  //2. 마커 찍기
  const marker = new kakao.maps.Marker({
    position: map.value.getCenter(),
  });
  marker.setMap(map.value);

  //3. 지도 click 이벤트 핸들링
  kakao.maps.event.addListener(map.value, "click", (mouseEvent) => {
    // 클릭한 위도, 경도 정보를 가져옵니다
    const latlng = mouseEvent.latLng;
    // 마커 위치를 클릭한 위치로 옮깁니다
    marker.setPosition(latlng);
  });
};

onMounted(() => {
  if (window.kakao && window.kakao.maps) loadMap();
  else loadScript();
});
</script>

<template>
  <div>
    <div ref="container" id="map"></div>
  </div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>

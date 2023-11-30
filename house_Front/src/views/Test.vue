<script setup>
import VPageNavigation from "@/components/common/VPageNavigation.vue";
import SearchBar from "@/components/SearchBar.vue";
import { RouterLink, useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { localAxios } from "@/utils/http-commons";
import KakaoMap from "@/components/common/KakaoMap.vue";
// import VKakaoMap from "@/components/common/VKakaoMap.vue";
import { useHouseStore } from "@/stores/house";
import { useBasketStore } from "@/stores/basket";
import { useAuthStore } from "@/stores/auth";
import { temp } from "@/stores/product";

const houses = ref([]);

const authStore = useAuthStore();
const houseStore = useHouseStore();
const basketStore = useBasketStore();

const myHouseList = computed(() => houseStore.MyHouseList);
const userId = computed(() => authStore.user.userId);
const role = computed(() => authStore.user.role);

const totalPageCount = computed(() => houseStore.totalPageCount);

const router = useRouter();

const currentPage = ref(1);
const totalPage = ref(0);
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;
const param = ref({
  pgno: currentPage.value, //현재 페이지 번호
  spp: VITE_ARTICLE_LIST_SIZE, //한 페이지에 얻어올 게시글 개수
  key: "", //조건 검색 시 컬럼명
  word: "", //해당 컬럼에 일치하는 데이터
});

// houseStore.getHouseList();

console.log("유저 아이디  : ", userId.value);
houseStore.getMyHouseList(userId.value);
console.log("내 매물 목록 ", myHouseList);

function onPageChange(value) {
  console.log(value, "페이지 변화 감지");
  param.value.pgno = value;
  getHouseList();
}

const url = "/house";
const local = localAxios();

function selectAdminHouseAll(param, success, fail) {
  local.get(`${url}/admin`, { params: param }).then(success).catch(fail);
}

function selectHouseAll(param, success, fail) {
  local.get(`${url}/user`, { params: param }).then(success).catch(fail);
}

const getHouseList = () => {
  console.log("서버로 글목록 얻으러 가자!!!", param.value);

  //api호출
  if (role.value === "admin") {
    selectAdminHouseAll(
      param.value,
      ({ data }) => {
        houses.value = data.houses;
        currentPage.value = data.currentPage;
        totalPage.value = data.totalPageCount;
      },
      (error) => {
        console.log(error);
      }
    );
  } else {
    selectHouseAll(
      param.value,
      ({ data }) => {
        houses.value = data.houses;
        currentPage.value = data.currentPage;
        totalPage.value = data.totalPageCount;
      },
      (error) => {
        console.log(error);
      }
    );
  }
};

onMounted(() => {
  getHouseList();
});

const addBasket = (aptCode) => {
  console.log(aptCode, ownerId);
  if (userId.value == "") {
    alert("로그인 권한 필요");
    router.push("/login"); // 인증되지 않은 경우, 로그인 페이지로 리다이렉트
    return;
  }

  // 중복된 매물 등록 차단
  // if (myHouseList.value != null){
  //   for (const houseInfo of myHouseList) {
  //     console.log("중복 매물 체크 로직체크", houseInfo.value);
  //     if (houseInfo.value.aptCode == aptCode) {
  //       alert("이미 장바구니에 존재하는 매물입니다.")
  //     }
  //   }
  // } else {
  //   console.log("보유 매물 없다잉");
  // }

  //소유주 아이디와 겹치는 경우 block
  // if (userId.value == ownerId) {
  //   alert("자기 자신의 매물은 추가할 수 없습니다.");
  //   return;
  // }

  const basketInfo = ref({
    userId: userId.value,
    aptCode: aptCode,
  });

  try {
    basketStore.addBasket(basketInfo.value);
    alert("장바구니 추가 완료하였습니다");
  } catch (error) {
    console.error("장바구니 추가 실패 :", error);
    alert("장바구니 추가 실패헀습니다 ㅠ");
  }
};

// 검색 파트, 추후에 기능 추가
// const getSearchArticles = (searchKeyword) => {
//   // console.log("BoardList의 조건 검색 메소드 호출:", searchKeyword);

//   params.value.key = searchKeyword.key;
//   params.value.word = searchKeyword.word;
//   params.value.pgno = 1;

//   // 목록 조회 필요
//   houseStore.getMyBasket(params.value);
// };
</script>

<template>
  <div>
    <!-- <div class="preloader"><div class="loaded">&nbsp;</div></div> -->
    <div class="culmn">
      <!-- Header Section -->
      <header id="main_menu" class="header navbar-fixed-top">
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <title>Bino html5 free Template</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />

        <link rel="stylesheet" href="/assets/HouseList/css/iconfont.css" />
        <link rel="stylesheet" href="/assets/HouseList/css/slick/slick.css" />
        <link
          rel="stylesheet"
          href="/assets/HouseList/css/slick/slick-theme.css"
        />
        <link rel="stylesheet" href="/assets/HouseList/css/stylesheet.css" />
        <link
          rel="stylesheet"
          href="/assets/HouseList/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="/assets/HouseList/css/jquery.fancybox.css"
        />
        <link rel="stylesheet" href="/assets/HouseList/css/bootstrap.css" />
        <link rel="stylesheet" href="/assets/HouseList/css/bootstrap.min.css" />
        <link
          rel="stylesheet"
          href="/assets/HouseList/css/magnific-popup.css"
        />

        <!--For Plugins external css-->
        <link rel="stylesheet" href="/assets/HouseList/css/plugins.css" />

        <!--Theme custom css -->
        <link rel="stylesheet" href="/assets/HouseList/css/style.css" />

        <!--Theme Responsive css-->
        <link rel="stylesheet" href="/assets/HouseList/css/responsive.css" />
      </header>
      <!-- End of header -->

      <!-- Blog Section -->
      <section id="blog" class="blog">
        <div class="container-fluid">
          <div class="row">
            <div class="main_blog sections">
              <div class="head_title text-center">
                <h2>매물 목록</h2>
                <div class="subtitle">꿀방과 함께하는 개꿀빠는 매물 목록</div>
                <div class="separator"></div>
              </div>
              <!-- End off Head_title -->

              <div class="main_blog_content">
                <div class="col-sm-6">
                  <div class="single_blog_area textwhite">
                    <div class="row">
                      <div class="col-sm-6 no-padding">
                        <div class="single_blog_img">
                          <img
                            src="/assets/HouseList/images/blog1.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                      <div class="col-sm-6 no-padding">
                        <div class="single_blog_text s_b_left">
                          <p class="black_text" style="color: black">
                            art/t-shirt
                          </p>
                          <h3 class="black_text">T-SHIRT DESIGN</h3>
                          <div class="separator2"></div>
                          <p class="black_text">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the indu
                            Stry's standard dummy text ever since the 1500s, an
                            unknown printer took a galley of type a scrambled it
                            to make a type specimen book.
                          </p>

                          <a href="" class="read_more">Read More >></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="single_blog_area textwhite">
                    <div class="row">
                      <div class="col-sm-6 no-padding">
                        <div class="single_blog_img">
                          <img
                            src="/assets/HouseList/images/blog2.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                      <div class="col-sm-6 no-padding">
                        <div class="single_blog_text s_b_left">
                          <p>art/t-shirt</p>
                          <h3>T-SHIRT DESIGN</h3>
                          <div class="separator2"></div>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the indu
                            Stry's standard dummy text ever since the 1500s, an
                            unknown printer took a galley of type a scrambled it
                            to make a type specimen book.
                          </p>

                          <a href="" class="read_more">Read More >></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="single_blog_area textwhite">
                    <div class="row">
                      <div class="col-sm-6 col-sm-push-6 no-padding">
                        <div class="single_blog_img">
                          <img
                            src="/assets/HouseList/images/blog3.jpg"
                            alt=""
                          />
                        </div>
                      </div>

                      <div class="col-sm-6 col-sm-pull-6 no-padding">
                        <div class="single_blog_text s_b_right">
                          <p>art/t-shirt</p>
                          <h3>T-SHIRT DESIGN</h3>
                          <div class="separator2"></div>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the indu
                            Stry's standard dummy text ever since the 1500s, an
                            unknown printer took a galley of type a scrambled it
                            to make a type specimen book.
                          </p>

                          <a href="" class="read_more">Read More >></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="single_blog_area textwhite">
                    <div class="row">
                      <div class="col-sm-6 col-sm-push-6 no-padding">
                        <div class="single_blog_img">
                          <img
                            src="/assets/HouseList/images/blog4.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                      <div class="col-sm-6 col-sm-pull-6 no-padding">
                        <div class="single_blog_text s_b_right">
                          <p>art/t-shirt</p>
                          <h3>T-SHIRT DESIGN</h3>
                          <div class="separator2"></div>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the indu
                            Stry's standard dummy text ever since the 1500s, an
                            unknown printer took a galley of type a scrambled it
                            to make a type specimen book.
                          </p>

                          <a href="" class="read_more">Read More >></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="basket-item col-sm-6"
                  v-for="house in houses"
                  :key="house.aptCode"
                  @click="houseStore.moveDetail(house.aptCode)"
                >
                  <div class="single_blog_area textwhite">
                    <div class="row">
                      <div class="col-sm-6 col-sm-push-6 no-padding">
                        <div class="single_blog_img">
                          <img
                            src="/assets/HouseList/images/blog4.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                      <div class="col-sm-6 col-sm-pull-6 no-padding">
                        <div class="single_blog_text s_b_right">
                          <button
                            class="add-basket-btn"
                            @click.stop="addBasket(house.aptCode)"
                          >
                            추가
                          </button>
                          <p>art/t-shirt</p>
                          <h2>{{ house.apartmentName }}</h2>
                          <div class="separator2"></div>
                          <p>{{ house.aptCode }}</p>
                          <p>{{ house.dong }}</p>
                          <p>{{ house.roadName }}</p>
                          <p>{{ house.buildYear }}</p>

                          <a href="" class="read_more">Read More >></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End off container -->
      </section>
      <!-- End off Blog Section -->

      <!-- Scroll to Top Button -->
      <div class="scrollup">
        <a href="#"><i class="fa fa-chevron-up"></i></a>
      </div>
    </div>
  </div>
</template>

<!-- <script src="/assets/HouseList/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script> -->
<style scoped>
/* 여기에 CSS 스타일을 추가하십시오. */
</style>

<template>
  <div class="pageContainer">
    <div class="pageContent">
      <section class="resultSection">
        <h2 class="empInfoTitle">{{ language.person }}</h2>
        <ul class="empInfoList">
          <span v-if="this.sortdata.category">
            <li
              v-for="(data, index) in sortdata.category.approval"
              :key="index"
            >
              <router-link :to="`/detail/${index}`">
                <div class="profile">
                  <div class="thumb">
                    <img src="../portal/images/_emp_thumb_x76_01.png" alt="" />
                  </div>
                  <div class="name kor">안지원 {{ data.author }}</div>
                </div>
                <div class="dept">게임빌컴투스 플랫폼/플랫폼 총괄 {{ data.author }}</div>
                <div class="pos">
                  <span>직급: 과장</span> <span>직책: 총괄</span>
                </div>
                <div class="contact">
                  <span>회사: 02-256-1234</span>
                  <span>휴대폰: 010-1234-5678</span>
                </div>
                <div class="contact">
                  <span>자택: 02-654-7894</span>
                  <span>E-mail: admin@gamevill.co.kr</span>
                </div>
                <div class="work"><span>담당업무: 기획/마케팅</span></div>
              </router-link>
            </li>
          </span>
        </ul>
        <div class="pagination">
          {{ sortdata.total_cnt }}
          {{ nowpage }}
          <ul>
            <span v-if="!(this.nowpage == 1)">
              <li>
                <router-link
                  :to="`/board/approval/page?name=${'first'}`"
                  class="btn btnPrev"
                  >처음
                </router-link>
              </li>
              <li>
                <router-link
                  :to="`/board/approval/page?name=${'prev'}`"
                  class="btn btnPrev"
                  >이전
                </router-link>
              </li>
            </span>
            <span v-if="!(this.totalperpagecnt + 1 == nowpage)">
              <board-button :vforcnt="perpagecnt"></board-button>
            </span>
            <span v-else-if="this.remainder > 0">
              <board-button :vforcnt="perpage + 1"></board-button>
            </span>
            <span
              v-if="
                !(this.nowpage == this.totalperpagecnt + 1) &&
                !(
                  this.remainder === 0 &&
                  this.nowpage === this.totalperpagecnt &&
                  this.perpage === 0
                )
              "
            >
              <li>
                <router-link
                  :to="`/board/approval/page?name=${'next'}`"
                  class="btn btnNext"
                  >다음
                </router-link>
              </li>
              <li>
                <router-link
                  :to="`/board/approval/page?name=${'last'}`"
                  class="btn btnPrev"
                  >마지막
                </router-link>
              </li>
            </span>
          </ul>
        </div>
      </section>
    </div>
    <PageSide></PageSide>
  </div>
</template>

<script>
import PageSide from "./PageSide";
import BoardButton from "./BoardButton.vue";
import { mapState } from "vuex";
import config from "../config.json";
import Spinner from "./Spinner.vue";
import bus from "../utils/bus.js";

export default {
  computed: {
    ...mapState({
      sortdata: (state) => state.sortdata,
      nowpage: (state) => state.nowpage,
      perpage: (state) => state.perpage,
      perpagecnt: (state) => state.perpagecnt,
      totalperpagecnt: (state) => state.totalperpagecnt,
      remainder: (state) => state.remainder,
      language: (state) => state.language,
      category: (state) => state.data.class,
    }),
  },
  components: {
    PageSide,
    Spinner,
    BoardButton,
  },
  created() {
    bus.$on("on:progress", this.onProgress);
  },
  mounted() {
    bus.$on("off:progress", this.offProgress);
  },
  beforeDestroy() {
    bus.$off("on:progress");
    bus.$off("off:progress");
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    onProgress() {
      this.loading = true;
    },
    offProgress() {
      this.loading = false;
    },
  },
};
</script>

<style>
</style>
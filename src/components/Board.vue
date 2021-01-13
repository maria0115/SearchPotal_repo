<template>
  <div class="pageContainer">
    <spinner :loading="loading"></spinner>
    <div class="pageContent">
      <section class="resultSection">
        <h2 class="boardTitle">전자결재</h2>
        <ul class="boardList">
          <!-- <router-view></router-view> -->
          <span v-if="this.sortdata.category">
            <!-- <span v-if="Array.isArray(this.sortdata.category.approval) && this.sortdata.category.approval.length>0"> -->
            <li
              v-for="(data, index) in sortdata.category.approval"
              :key="index"
            >
              <router-link :to="`/detail/${index}`">
                <a href="#">
                  <span class="location">{{ data.from }}</span>
                  <span class="subject">{{ data.subject }}</span>
                  >
                  <span class="write"
                    >안지원 매니저 / 전략구매팀
                    <span class="date">{{ data.created }}</span></span
                  >
                  <span class="content">{{ data.body }}</span>
                  <span class="attch"
                    ><span class="hidden">첨부파일</span></span
                  >
                </a>
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
                <router-link :to="`/board/approval/page?name=${'first'}`">
                  <a href="#" class="btn btnPrev">처음</a>
                </router-link>
              </li>
              <router-link :to="`/board/approval/page?name=${'prev'}`">
                <li><a href="#" class="btn btnPrev">이전</a></li>
              </router-link>
            </span>
            <span v-if="!(this.totalperpagecnt + 1 == nowpage)">
              <board-button :vforcnt="perpagecnt"></board-button>
            </span>
            <span v-else-if="this.remainder > 0">
              <board-button :vforcnt="perpage + 1"></board-button>
            </span>
            <span v-if="(!(this.nowpage == this.totalperpagecnt + 1))&&(!(this.remainder === 0&&this.nowpage===this.totalperpagecnt&&this.perpage===0))">
              <li>
                <router-link :to="`/board/approval/page?name=${'next'}`">
                  <a href="#" class="btn btnNext">다음</a>
                </router-link>
              </li>
              <li>
                <router-link :to="`/board/approval/page?name=${'last'}`">
                  <a href="#" class="btn btnPrev">마지막</a>
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
      remainder:(state) => state.remainder,
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
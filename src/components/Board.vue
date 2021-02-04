<template>
  <div class="pageContainer">
    <!-- <spinner :loading="loading"></spinner> -->
    <div class="pageContent">
      <section class="resultSection">
        <h2 class="boardTitle">{{ language[category] }}</h2>
        <ul class="boardList">
          <span v-if="sortdata[category]">
            <li v-for="(data, index) in sortdata[category].data" :key="index">
              <a :href="url + data.originalurl" target="blank">
                <span class="location">{{ data.nav }}</span>
                <span class="subject">{{ data.subject }}</span>
                <span class="write"
                  >{{ setWord(data.author) }} / {{ setWord(data.dept) }}
                  <span class="date">{{ getTime(data.created) }}</span></span
                >
                <span class="content">{{ data.body }}</span>
                <span class="attch"><span class="hidden">첨부파일</span></span>
              </a>
            </li>
          </span>

          <!-- <span v-else-if="category === 'board'">
            <span v-if="boardData">
              <li v-for="(data, index) in boardData.data" :key="index">
                <router-link :to="`/detail/${index} board`">
                  <a :href="url + data.originalurl" target="blank">
                    <span class="location">{{ data.from }}</span>
                    <span class="subject">{{ data.subject }}</span>
                    <span class="write"
                      >{{ setWord(data.author) }} / {{ setWord(data.dept) }}
                      <span class="date">{{
                        getTime(data.created)
                      }}</span></span
                    >
                    <span class="content">{{ data.body }}</span>
                    <span class="attch"
                      ><span class="hidden">첨부파일</span></span
                    >
                  </a>
                </router-link>
              </li>
            </span>
          </span> -->
        </ul>
        <div class="pagination">
          <ul>
            <span v-if="!(this.nowpage == 1)">
              <li>
                <router-link
                  :to="`/ematesearch/${category}/page?name=${'first'}`"
                  class="btn btnPrev"
                >
                  처음
                </router-link>
              </li>
              <li>
                <router-link
                  :to="`/ematesearch/${category}/page?name=${'prev'}`"
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
            <span v-else-if="this.remainder == 0">
              <board-button :vforcnt="perpage"></board-button>
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
                  :to="`/ematesearch/${category}/page?name=${'next'}`"
                  class="btn btnNext"
                  >다음
                </router-link>
              </li>
              <li>
                <router-link
                  :to="`/ematesearch/${category}/page?name=${'last'}`"
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
// import Spinner from "./Spinner.vue";
// import bus from "../utils/bus.js";
export default {
  computed: {
    ...mapState({
      sortdata: (state) => state.sortdata,
      approData: (state) => state.approData,
      boardData: (state) => state.boardData,
      nowpage: (state) => state.nowpage,
      perpage: (state) => state.perpage,
      perpagecnt: (state) => state.perpagecnt,
      totalperpagecnt: (state) => state.totalperpagecnt,
      remainder: (state) => state.remainder,
      language: (state) => state.language,
      category: (state) => state.data.class,
    }),
    url() {
      return config.url;
    },
  },
  components: {
    PageSide,
    BoardButton,
    // Spinner,
  },
  methods: {
    getTime(date) {
      var moment = require("moment");
      var localTime = moment.utc(date).toDate();
      localTime = moment(localTime).format("YYYYMMDDTHHmmss");
      return localTime;
    },
    setWord(word) {
      if (word.includes(this.language.locale)) {
        if (JSON.parse(word)[this.language.locale].length > 0) {
          word = JSON.parse(word)[this.language.locale];
        }
      }

      return word;
    },
  },
  // created() {
  //   bus.$on("on:progress", this.onProgress);
  // },
  // mounted() {
  //   bus.$on("off:progress", this.offProgress);
  // },
  // beforeDestroy() {
  //   bus.$off("on:progress");
  //   bus.$off("off:progress");
  // },
  // data() {
  //   return {
  //     loading: false,
  //   };
  // },
  // methods: {
  //   onProgress() {
  //     this.loading = true;
  //   },
  //   offProgress() {
  //     this.loading = false;
  //   },
  // },
};
</script>

<style>
</style>
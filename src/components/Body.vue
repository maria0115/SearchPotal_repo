<template>
  <div class="pageContainer">
    <div class="pageContent">
      <section class="resultSection">
        <h2 class="title">
          {{ language.person }}
          <!-- <span class="cnt">92</span> -->
        </h2>
        <ul class="employeeList">
          <span v-if="this.personData">
            <!-- <span v-if="Array.isArray(this.sortdata.category.approval) && this.sortdata.category.approval.length>0"> -->
            <li v-for="(data, index) in personData.data" :key="index">
              <!-- <router-link :to="`/detail/${index} person`"> -->
              <a :href="url + data.originalurl" target="blank">
                <span class="thumb"
                  ><img src="../portal/images/_emp_thumb_x76_01.png" alt=""
                /></span>
                <span class="name kor">{{ data.subject }}</span>
                <span class="team">{{ setWord(data.dept) }}</span>
              </a>
              <!-- </router-link> -->
            </li>
          </span>
        </ul>
        <span @click="setClass('person')">
          <router-link :to="`/person/person`" class="btnMore">
            MORE
          </router-link>
        </span>
      </section>
      <section class="resultSection" v-if="category.approval">
        <h2 class="boardTitle">{{ language.approval }}</h2>
        <ul class="boardList">
          <span v-if="this.approData">
            <!-- <span v-if="Array.isArray(this.sortdata.category.approval) && this.sortdata.category.approval.length>0"> -->
            <li v-for="(data, index) in approData.data" :key="index">
              <!-- <router-link :to="`/detail/${index} approval`"> -->
              <a :href="url + data.originalurl" target="blank">
                <span class="location">{{ setWord(data.dept) }}</span>
                <span class="subject">{{ data.subject }}</span>
                <span class="write"
                  >{{ setWord(data.author) }}
                  <span class="date">{{ getTime(data.created) }}</span></span
                >
                <span class="content">{{ data.body }}</span>
                <span class="attch"><span class="hidden">첨부파일</span></span>
              </a>
              <!-- </router-link> -->
            </li>
          </span>
        </ul>
        <router-link :to="`/board/approval`" class="btnMore">
          <span @click="setClass('approval')"> MORE </span>
        </router-link>
      </section>
      <section class="resultSection" v-if="category.board">
        <h2 class="boardTitle">{{ language.board }}</h2>
        <ul class="boardList">
          <span v-if="this.boardData">
            <!-- <span v-if="Array.isArray(this.sortdata.category.approval) && this.sortdata.category.approval.length>0"> -->
            <li v-for="(data, index) in boardData.data" :key="index">
              <!-- <router-link :to="`/detail/${index} board`"> -->
              <a :href="url + data.originalurl" target="blank">
                <span class="location">{{ setWord(data.dept) }}</span>
                <span class="subject">{{ data.subject }}</span>
                <span class="write"
                  >{{ setWord(data.author) }}
                  <span class="date">{{ getTime(data.created) }}</span></span
                >
                <span class="content">{{ data.body }}</span>
                <span class="attch"><span class="hidden">첨부파일</span></span>
              </a>
              <!-- </router-link> -->
            </li>
          </span>
        </ul>
        <router-link :to="`/board/board`" class="btnMore">
          <span @click="setClass('board')"> MORE </span>
        </router-link>
      </section>
    </div>

    <PageSide></PageSide>
  </div>
</template>

<script>
import PageSide from "./PageSide";
import { mapState } from "vuex";
import config from "../config.json";

export default {
  components: {
    PageSide,
  },
  computed: {
    ...mapState({
      language: (state) => state.language,
      sortdata: (state) => state.sortdata,
      approData: (state) => state.approData,
      boardData: (state) => state.boardData,
      personData: (state) => state.personData,
      languageoptionselected: (state) => state.languageoptionselected,
    }),
    category() {
      return config.category;
    },
    url() {
      return config.url;
    },
  },
  methods: {
    setClass(className) {
      this.$store.dispatch("setClass", className);
      this.$store.dispatch("BigCategory", className);
    },
    getTime(date) {
      var moment = require("moment");
      var localTime = moment.utc(date).toDate();
      localTime = moment(localTime).format("YYYYMMDDTHHmmss");
      // localTime = moment(localTime).format(
      //   "YYYY년 MM월 DD일 HH시 mm분 ss초 (+09:00)"
      // );
      return localTime;
    },
    setWord(word) {
      if (word.includes(this.language.locale)) {
        if (JSON.parse(word).ko.length > 0) {
          word = JSON.parse(word)[this.language.locale];
        }
      }
      return word;
    },
  },
};
</script>

<style>
</style>
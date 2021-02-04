<template>
  <div class="pageContainer">
    <div class="pageContent">
      <section class="resultSection">
        <h2 class="title">
          <router-link :to="`/ematesearch/person`">
            <span @click="setClass('person')"> {{ language.person }} </span>
            <span class="cnt">
              {{ setNum(this.personData) }}
            </span>
          </router-link>
        </h2>
        <ul class="employeeList">
          <span v-if="this.personData">
            <!-- <span v-if="Array.isArray(this.sortdata.category.approval) && this.sortdata.category.approval.length>0"> -->
            <li v-for="(data, index) in personData.data" :key="index">
              <!-- <router-link :to="`/detail/${index} person`"> -->
              <a :href="url + data.originalurl" target="blank">
                <span class="thumb"
                  ><img :src="url + data.photo" alt="" />
                </span>
                <span class="name kor">{{ data.subject }}</span>
                <span class="team">{{ setWord(data.dept) }}</span>
              </a>
              <!-- </router-link> -->
            </li>
          </span>
        </ul>
        <span @click="setClass('person')">
          <router-link :to="`/ematesearch/person`" class="btnMore">
            MORE
          </router-link>
        </span>
      </section>

      <span>
        <section
          class="resultSection"
          v-for="(cate, index) in category"
          :key="index"
        >
          <span v-if="cate !== 'person' && cate !== 'allsearch'">
            <h2 class="boardTitle">
              <router-link :to="`/ematesearch/${cate}`">
                <span @click="setClass(cate)"> {{ language[cate] }} </span>
              </router-link>
            </h2>
            <ul class="boardList">
              <span v-if="sortdata[cate]">
                <!-- <span v-if="Array.isArray(this.sortdata.category.approval) && this.sortdata.category.approval.length>0"> -->
                <li v-for="(data, index) in sortdata[cate].data" :key="index">
                  <!-- <router-link :to="`/detail/${index} approval`"> -->
                  <a :href="url + data.originalurl" target="blank">
                    <span class="location">{{ setWord(data.dept) }}</span>
                    <span class="subject">{{ data.subject }}</span>
                    <span class="write"
                      >{{ setWord(data.author) }}
                      <span class="date">{{
                        getTime(data.created)
                      }}</span></span
                    >
                    <span class="content">{{ data.body }}</span>
                    <span class="attch"
                      ><span class="hidden">첨부파일</span></span
                    >
                  </a>
                  <!-- </router-link> -->
                </li>
              </span>
            </ul>
          </span>
          <router-link :to="`/ematesearch/${cate}`" class="btnMore">
            <span @click="setClass(cate)"> MORE </span>
          </router-link>
        </section>
      </span>
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
    setNum(list) {
      return 0;
    },
  },
};
</script>

<style>
</style>
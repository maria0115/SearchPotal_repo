<template>
  <div class="pageContainer">
    <div class="pageContent">
      <section class="resultSection">
        <h2 class="empInfoTitle">{{ language.person }}</h2>
        <ul class="empInfoList">
          <span v-if="this.personData">
            <!-- <span v-if="Array.isArray(this.sortdata.category.approval) && this.sortdata.category.approval.length>0"> -->
            <li v-for="(data, index) in personData.data" :key="index">
              <!-- <router-link :to="`/detail/${index} person`"> -->
              <a :href="url + data.originalurl" target="blank">
                <div class="profile">
                  <div class="thumb">
                    <img :src="url + data.photo" alt="" />
                  </div>
                  <div class="name kor">{{ data.subject }}</div>
                </div>
                <div class="dept">{{ setWord(data.dept) }}</div>
                <div class="pos">
                  <span>직책: {{ data.jobposition }}</span>
                </div>
                <div class="contact">
                  <span>회사: {{ data.companytel }}</span>
                  <span>휴대폰: {{ data.phone }}</span>
                </div>
                <div class="contact">
                  <span>E-mail: {{ data.email }}</span>
                </div>
                <div class="work">
                  <span>담당업무: {{ data.job }}</span>
                </div>
              </a>
              <!-- </router-link> -->
            </li>
          </span>
        </ul>
        <div class="pagination">
          <!-- {{ sortdata.total_cnt }}
{{ nowpage }} -->
          <ul>
            <span v-if="!(this.nowpage == 1)">
              <li>
                <router-link
                  :to="`/ematesearch/person/page?name=${'first'}`"
                  class="btn btnPrev"
                  >처음
                </router-link>
              </li>
              <li>
                <router-link
                  :to="`/ematesearch/person/page?name=${'prev'}`"
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
                  :to="`/ematesearch/person/page?name=${'next'}`"
                  class="btn btnNext"
                  >다음
                </router-link>
              </li>
              <li>
                <router-link
                  :to="`/ematesearch/person/page?name=${'last'}`"
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

export default {
  computed: {
    ...mapState({
      sortdata: (state) => state.sortdata,
      personData: (state) => state.personData,
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
  },
  methods: {
    setWord(word) {
      if (word.includes(this.language.locale)) {
        if (JSON.parse(word)[this.language.locale].length > 0) {
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
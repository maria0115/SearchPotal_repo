<template>
  <div class="pageContainer">
    <spinner :loading="tf"></spinner>
    <div class="pageContent">
      <section class="resultSection">
        <h2 class="empInfoTitle">{{ language.person }}</h2>
        <ul class="empInfoList">
          <span v-if="this.personData">
            <!-- <span v-if="Array.isArray(this.sortdata.category.approval) && this.sortdata.category.approval.length>0"> -->
            <li v-for="(data, index) in personData.data" :key="index">
              <router-link :to="`/detail/${index} person`">
                <div class="profile">
                  <div class="thumb">
                    <img src="../portal/images/_emp_thumb_x76_01.png" alt="" />
                  </div>
                  <div class="name kor">{{ data.subject }}</div>
                </div>
                <div class="dept">{{ data.dept }}</div>
                <div class="pos">
                  <span>직급: {{ data.jobTitle }}</span>
                  <span>직책: {{ data.jobPosition }}</span>
                </div>
                <div class="contact">
                  <span>회사: {{ data.company }}</span>
                  <span>휴대폰: {{ data.phone }}</span>
                </div>
                <div class="contact">
                  <span>자택: {{ data.tel }}</span>
                  <span>E-mail: {{ data.email }}</span>
                </div>
                <div class="work">
                  <span>담당업무: {{ data.job }}</span>
                </div>
              </router-link>
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
                  :to="`/person/person/page?name=${'first'}`"
                  class="btn btnPrev"
                  >처음
                </router-link>
              </li>
              <li>
                <router-link
                  :to="`/person/person/page?name=${'prev'}`"
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
                  :to="`/person/person/page?name=${'next'}`"
                  class="btn btnNext"
                  >다음
                </router-link>
              </li>
              <li>
                <router-link
                  :to="`/person/person/page?name=${'last'}`"
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
      tf: (state) => state.tf,
    }),
  },
  components: {
    PageSide,
    Spinner,
    BoardButton,
  },
};
</script>

<style>
</style>
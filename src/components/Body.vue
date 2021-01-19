<template>
  <div class="pageContainer">
    <div class="pageContent">
      <section class="resultSection">
        <h2 class="title">{{ language.person }} <span class="cnt">92</span></h2>
        <ul class="employeeList">
          <span v-if="this.sortdata.length > 0">
            <!-- <span v-if="Array.isArray(this.sortdata.category.approval) && this.sortdata.category.approval.length>0"> -->
            <li v-for="(data, index) in sortdata" :key="index">
              <router-link :to="`/detail/${index}`">
                <a href="#">
                  <span class="thumb"
                    ><img :src="sortdata[index].photo" alt=""
                  /></span>
                  <span class="name kor">{{ sortdata[index].subject }}</span>
                  <span class="team">{{ sortdata[index].dept }}</span>
                </a>
              </router-link>
            </li>
          </span>
        </ul>
        <router-link
          :to="`/person/person`"
          class="btnMore"
          @click="setClass('person')"
        >
          <span @click="setClass('person')"> MORE </span>
        </router-link>
      </section>
      <!-- <section class="resultSection">
        <h2 class="title">부서 <span class="cnt">52</span></h2>
        <ul class="departmentList">
          <li>
            <a href="#">
              <span class="dept">구매지원실</span>
              <span class="company">게임빌</span>
              <span class="team">게임빌 &gt; 구매지원팀</span>
            </a>
          </li>
        </ul>
        <a href="#" class="btnMore">MORE</a>
      </section> -->
      <section class="resultSection">
        <h2 class="boardTitle">{{ language.approval }}</h2>
        <ul class="boardList">
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

          <li>
            <a href="#">
              <span class="location">게임빌 &gt; 결재 &gt; 진행함</span>
              <span class="subject"
                >무선 AP 및 무선 AP 컨트롤러 라이선스 구매 합의(요청)</span
              >
              <span class="write"
                >안지원 매니저 / 전략구매팀
                <span class="date">2020.07.31</span></span
              >
              <span class="content"
                >1. 목적 가. 본사 10층 MCNS, 11층 SKC HT&M 13층 기업문화실
                Mobile Office 구축을 위한 무선 AP구매 나. 기 도입한 무선 AP
                컨트롤러 라이선스 부족으로, 추가 구매 필요</span
              >
              <span class="attch"><span class="hidden">첨부파일</span></span>
            </a>
          </li>
        </ul>
        <router-link
          :to="`/board/approval`"
          class="btnMore"
          @click="setClass('approval')"
        >
          <span @click="setClass('approval')"> MORE </span>
        </router-link>
      </section>
      <section class="resultSection">
        <h2 class="boardTitle">{{ language.board }}</h2>
        <ul class="boardList">
          <li>
            <a href="#">
              <span class="location"
                >컴투스 &gt; 업무지원 &gt; 일반가이드 &gt; 인사실</span
              >
              <span class="subject">구매 절차 안내</span>
              <span class="write"
                >박윤희 매니저 / 전략구매팀
                <span class="date">2020.08.03</span></span
              >
              <span class="content"
                >다음과 같이 구글 드라이브 용량 업그레이드 비용을 처리하고자
                합니다.</span
              >
            </a>
          </li>
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

export default {
  components: {
    PageSide,
  },
  computed: {
    ...mapState({
      language: (state) => state.language,
      sortdata: (state) => state.sortdata,
    }),
  },
  methods: {
    setClass(className) {
      this.$store.dispatch("setClass", className);
    },
  },
};
</script>

<style>
</style>
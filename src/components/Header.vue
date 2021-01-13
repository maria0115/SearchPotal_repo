<template>
  <header class="pageHeader">
    <select @change="(e) => ChangeLanguage(e)">
      <option
        v-for="option in options"
        :key="option.value"
        v-bind:value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <div class="searchArea">
      <div class="searchBox">
        <div class="keyword">
          <input
            type="text"
            placeholder="검색어 입력"
            @keyup.enter="btnSearch"
            v-model="searchname"
          />
        </div>
        <button type="submit" class="btnSearch" @click="btnSearch">
          <span>검색</span>
        </button>
        <div class="acKeywordBox">
          <ul>
            <li>
              <a><em>플랫폼</em>1</a>
            </li>
            <li>
              <a><em>플랫폼</em>2</a>
            </li>
            <li>
              <a><em>플랫폼</em>3</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="searchOption">
        <label
          ><input
            type="checkbox"
            @click="(e) => ResearchCheck(e)"
            class="hidden"
          /><span class="txt">결과 내 재검색</span></label
        >
      </div>
    </div>
    <div class="lnb">
      <div class="lnbMenu">
        <ul>
          <li
            :class="{ on: CategoryOn('_all') }"
            @click="CategoryBtn('_all')"
          >
            <router-link :to="`/_all`">
              {{ language.allsearch }}
            </router-link>
          </li>
          <li 
          :class="{ on: CategoryOn('approval') }"
          @click="CategoryBtn('approval')">
            <router-link :to="`/board/approval`">
              {{ language.approval }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="filterArea">
      <div class="filterItem">
        <a class="btnToggle">{{ language.sortdate }}</a>
        <ul class="toggleBox">
          <li class="on">
            <a @click="SortBtn('_created', 'accOrrec')">{{
              language.sortdate
            }}</a>
          </li>
          <li><a @click="SortBtn('_created', 'accOrrec')">정확도순</a></li>
        </ul>
      </div>
      <div class="filterItem">
        <a class="btnToggle">모든 날짜</a>
        <ul class="toggleBox">
          <li class="on"><a @click="SortBtn('allday', '2')">모든 날짜</a></li>
          <li><a>지난 1시간</a></li>
          <li><a>지난 1일</a></li>
          <li><a>지난 1주</a></li>
          <li><a>지난 1개월</a></li>
          <li><a>지난 1년</a></li>
          <li>
            <a class="btnPeriod">기간 설정</a>
            <div class="datepickerArea">
              <div class="datepickerBox">
                <input type="text" class="datepicker" />
              </div>
              <div class="datepickerBox">
                <input type="text" class="datepicker" />
              </div>
              <a class="btnSubmit">적용</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="filterItem">
        <a class="btnToggle">{{ language.atthe }}</a>
        <ul class="toggleBox">
          <li class="on">
            <a @click="SortBtn('', 'fieldname')">{{ language.atthe }}</a>
          </li>
          <li>
            <a @click="SortBtn('_vc_wviwlist30__subject', 'fieldname')">{{
              language.atthetitle
            }}</a>
          </li>
          <li>
            <a @click="SortBtn('body', 'fieldname')">{{
              language.atthecontent
            }}</a>
          </li>
          <li>
            <a @click="SortBtn('_vc_wviwlist30__author', 'fieldname')">{{
              language.attheauthor
            }}</a>
          </li>
        </ul>
      </div>
    </div>
    <p class="resultMessage" v-html="language.searchresult">
      <!-- 검색어 <span class="highlight">&quot;플랫폼&quot;</span>에 대한
        <span class="highlight">307</span>건의 검색 결과입니다. -->
    </p>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      searchname: "",
    };
  },
  methods: {
    CategoryOn(category) {
      var id = this.$route.params.id;
      if (id == category) return true;
      else false;
    },
    btnSearch() {
      this.$store.dispatch("SearchWord", { word: this.searchname });
    },
    CategoryBtn(category) {
      this.$store.dispatch("BigCategory", category);
    },
    SortBtn(it, fieldname) {
      var id = this.$route.params.id;
      this.$store.dispatch("FilterData", {
        what: it,
        whatfield: fieldname,
        category: id,
      });
    },
    ChangeLanguage(e) {
      console.log(e.target.value);
      var value = e.target.value;
      this.$store.dispatch("LanguageFetchData", value);
    },
    ResearchCheck(e) {
      var checked = e.target.checked;
      this.$store.commit("ResearchCheck", checked);
    },
  },
  computed: {
    ...mapState({
      selected: (state) => state.languageoptionselected,
      language: (state) => state.language,
      options: (state) => state.languageoption,
    }),
  },
  created() {
    this.$store.dispatch("LanguageFetchData", "");
  },
};
</script>

<style>
</style>
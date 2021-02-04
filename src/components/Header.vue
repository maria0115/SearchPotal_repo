<template>
  <header class="pageHeader">
    <!-- <select @change="(e) => ChangeLanguage(e)">
      <option
        v-for="option in options"
        :key="option.value"
        v-bind:value="option.value"
      >
        {{ option.text }}
      </option>
    </select> -->
    <div class="searchArea">
      <div class="searchBox">
        <div class="keyword">
          <input
            type="text"
            :placeholder="language.inputsearch"
            @keyup.enter="btnSearch"
            v-model="data.searchword"
          />
        </div>
        <button type="submit" class="btnSearch" @click="btnSearch"></button>
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
          /><span class="txt">{{ language.searchofresult }}</span></label
        >
      </div>
    </div>
    <div class="lnb">
      <div class="lnbMenu">
        <ul>
          <!-- <li :class="{ on: CategoryOn('all') }" @click="CategoryBtn('all')">
            <router-link :to="`/all`">
              {{ language.allsearch }}
            </router-link>
          </li>
          <li
            :class="{ on: CategoryOn('person') }"
            @click="CategoryBtn('person')"
          >
            <router-link :to="`/person/person`">
              {{ language.person }}
            </router-link>
          </li>
          <li
            :class="{ on: CategoryOn('mail') }"
            @click="CategoryBtn('mail')"
          >
            <router-link :to="`/mail`">
              {{ language.mail }}
            </router-link>
          </li>
          <span v-for="(item, index) in category" :key="index">
            <li :class="{ on: CategoryOn(item) }" @click="CategoryBtn(item)">
              <router-link :to="`/board/${item}`">
                {{ language[item] }}
              </router-link>
            </li>
          </span> -->

          <span v-for="(item, index) in category" :key="index">
            <li :class="{ on: CategoryOn(item) }" @click="CategoryBtn(item)">
              <router-link :to="`/ematesearch/${item}`">
                {{ language[item] }}
              </router-link>
            </li>
          </span>

          <!-- <li :class="{ on: CategoryOn('all') }" @click="CategoryBtn('all')">
            <router-link :to="`/all`">
              {{ language.allsearch }}
            </router-link>
          </li>
          <li
            :class="{ on: CategoryOn('person') }"
            @click="CategoryBtn('person')"
          >
            <router-link :to="`/person/person`">
              {{ language.person }}
            </router-link>
          </li>
          <li
            :class="{ on: CategoryOn('approval') }"
            @click="CategoryBtn('approval')"
          >
            <router-link :to="`/board/approval`">
              {{ language.approval }}
            </router-link>
          </li>
          <li
            :class="{ on: CategoryOn('board') }"
            @click="CategoryBtn('board')"
          >
            <router-link :to="`/board/board`">
              {{ language.board }}
            </router-link>
          </li> -->
        </ul>
      </div>
    </div>
    <div class="filterArea">
      <div class="filterItem">
        <a class="btnToggle">{{ language.sortdate }}</a>
        <ul class="toggleBox">
          <li class="on">
            <a @click="SortBtn('desc', 'aOrd')">{{ language.sortdate }}</a>
          </li>
          <li>
            <a @click="SortBtn('accuracy', 'aOrd')">{{
              language.accuracyorder
            }}</a>
          </li>
        </ul>
      </div>
      <div class="filterItem">
        <a class="btnToggle">{{ language.alldates }}</a>
        <ul class="toggleBox">
          <li class="on">
            <a @click="SortBtn('all', 'dateType', 'default')">{{
              language.alldates
            }}</a>
          </li>
          <li>
            <a @click="SortBtn('ago', 'dateType', 'now-1h/s')">{{
              language.anhourago
            }}</a>
          </li>
          <li>
            <a @click="SortBtn('season', 'dateType', 'now-1d/d')">{{
              language.adayago
            }}</a>
          </li>
          <li>
            <a @click="SortBtn('season', 'dateType', 'now-7d/d')">{{
              language.aweekago
            }}</a>
          </li>
          <li>
            <a @click="SortBtn('season', 'dateType', 'now-1M/d')">{{
              language.amonthago
            }}</a>
          </li>
          <li>
            <a @click="SortBtn('season', 'dateType', 'now-1y/d')">{{
              language.ayearago
            }}</a>
          </li>
          <li>
            <a class="btnPeriod">{{ language.periodsetting }}</a>
            <div class="datepickerArea">
              <div class="datepickerBox">
                <input
                  type="text"
                  class="datepicker"
                  id="datepicker1"
                  v-model="startDate"
                  placeholder="MM/DD/YYYY"
                />
              </div>
              <div class="datepickerBox">
                <input
                  type="text"
                  class="datepicker"
                  id="datepicker2"
                  v-model="endDate"
                  placeholder="MM/DD/YYYY"
                />
              </div>
              <a class="btnSubmit" @click="SortBtn('custom', 'dateType')">{{
                language.apply
              }}</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="filterItem">
        <a class="btnToggle">{{ language.atthe }}</a>
        <ul class="toggleBox">
          <li class="on">
            <a @click="SortBtn('all', 'fieldname')">{{ language.atthe }}</a>
          </li>
          <li>
            <a @click="SortBtn('subject', 'fieldname')">{{
              language.atthetitle
            }}</a>
          </li>
          <li>
            <a @click="SortBtn('body', 'fieldname')">{{
              language.atthecontent
            }}</a>
          </li>
          <li>
            <a @click="SortBtn('author', 'fieldname')">{{
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
import config from "../config.json";

export default {
  data() {
    return {
      searchname: "",
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    CategoryOn(category) {
      var id = this.$route.params.id;
      if (id == category) return true;
      else false;
    },
    btnSearch() {
      var word = this.data.searchword;
      word = word.trim();
      this.$store.dispatch("SearchWord", { word: word });
    },
    CategoryBtn(category) {
      this.$store.dispatch("BigCategory", category);
    },
    SortBtn(it, fieldname, whatDate) {
      var id = this.$route.params.id;

      var moment = require("moment");
      // moment().format("YYYY-MM-DD HH:mm:ss Z");
      var lt = "";
      if (it == "custom") {
        if (this.startDate == "") {
          this.startDate = $("input#datepicker1").datepicker().val();
        }
        this.startDate = moment(new Date(this.startDate)).format(
          "YYYYMMDDHHmmss"
        );
        if (this.endDate == "") {
          this.endDate = $("input#datepicker2").datepicker().val();
          // this.endDate = moment(this.endDate).add(1, "days").format("YYYYMMDD");
        }
        this.endDate = moment(new Date(this.endDate))
          .add(1, "days")
          .format("YYYYMMDDHHmmss");
        if (this.startDate != "") {
          whatDate = this.startDate;
        }

        if (this.endDate != "") {
          lt = this.endDate;
        }

        // if (this.startDate != "" && this.endDate != "") {
        //   var dateArr = [this.startDate, this.endDate];
        //   whatDate = dateArr;
        // }
      }

      if (
        typeof whatDate == "undefined" ||
        typeof whatDate == undefined ||
        whatDate == null ||
        whatDate == ""
      ) {
        whatDate = this.sortdata.gte;
      }

      this.$store.dispatch("FilterData", {
        what: it,
        whatfield: fieldname,
        category: id,
        gte: whatDate,
        lt: lt,
      });

      this.startDate = "";
      this.endDate = "";
    },
    // ChangeLanguage(e) {
    //   console.log(e.target.value);
    //   var value = e.target.value;
    //   this.$store.dispatch("LanguageFetchData", value);
    // },
    ResearchCheck(e) {
      var checked = e.target.checked;
      this.$store.commit("ResearchCheck", checked);
    },
    // dateFilter() {
    //   var moment = require("moment"); // moment 모듈불러오기

    //   var now = moment(); //오늘
    //   var now = moment("2020-01-01"); //특정일 셋팅
    //   console.log("ffffffffffffffff", now._d);

    //   //moment().add(number,String); 추가
    //   //moment().subtract(number,String); 빼기

    //   var tomorrow = moment().add(1, "days"); //내일
    //   var yesterday = moment().subtract(1, "days"); //어제
    //   var addMonth = moment().add(1, "months"); //한달 뒤
    //   var subMonth = moment().subtract(1, "months"); //한달 전
    //   var addYear = moment().add(1, "years"); //일년 뒤
    //   var subYear = moment().subtract(1, "years"); //일년 전

    //   moment().format("YYYY-MM-DD HH:mm:ss Z");
    //   console.log("now ", now.format());
    //   console.log("tomorrow ", tomorrow.format());
    //   console.log("yesterday ", yesterday);
    //   console.log("addMonth ", addMonth);
    //   console.log("subMonth ", subMonth);
    //   console.log("addYear ", addYear);
    //   console.log("subYear ", subYear);
    // },
  },
  computed: {
    ...mapState({
      selected: (state) => state.languageoptionselected,
      language: (state) => state.language,
      options: (state) => state.languageoption,
      sortdata: (state) => state.sortdata,
      data: (state) => state.data,
    }),
    category() {
      return config.category;
    },
  },
  created() {
    var text = this.$route.query.text;

    // 쿼리스트링 넘기기
    //  <router-link :to="{path:'ematesearch/person', query:{text:'다시'}}">

    if (
      typeof text == "undefined" ||
      typeof text == undefined ||
      text == null ||
      text == ""
    ) {
      return;
    }
    text = text.trim();
    this.$store.dispatch("SearchWord", { word: text });
  },
};
</script>

<style>
</style>
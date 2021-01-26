<template>
  <div class="pageAside">
    <section class="asideSection">
      <h2>연관 검색어</h2>
      <ol class="relatedList" v-if="rList.length > 0">
        <li v-for="(item, index) in rList" :key="index">
          <span v-if="this.clicked">
            <a href="#" class="keyword" @click="keywordSearch(item.key)">{{
              item.key
            }}</a>
            <a href="#" class="btnDel"><span class="hidden" @click="deleteKeyword">삭제</span></a>
          </span>
        </li>
      </ol>
    </section>
    <section class="asideSection">
      <h2>인기검색어</h2>
      <ul class="tabMenu">
        <li class="on">
          <a href="#" @click="kListFilter('thisWeek')">이번주</a>
        </li>
        <li><a href="#" @click="kListFilter('thisMonth')">이번달</a></li>
      </ul>
      <ol
        class="popularList tabContent"
        id="popularWeekList"
        style="display: block"
        v-if="kList.length > 0"
      >
        <li v-for="(item, index) in kList" :key="index">
          <a href="#" v-if="index < 5"
            ><em class="num">{{ index + 1 }}</em
            ><span class="keyword" @click="keywordSearch(item.key)">{{
              item.key
            }}</span></a
          >
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      clicked: true,
    };
  },
  computed: {
    ...mapState({
      language: (state) => state.language,
      kList: (state) => state.kList,
      rList: (state) => state.rList,
      term: (state) => state.term,
    }),
  },
  created() {
    this.$store.dispatch("KSearch", { term: this.term });
  },
  methods: {
    keywordSearch(keyword) {
      this.$store.dispatch("SearchWord", { word: keyword });
    },
    kListFilter(term) {
      this.$store.dispatch("KSearch", { term: term });
    },
    deleteKeyword(){
      this.clicked = false;
    },
  },
};
</script>

<style>
</style>
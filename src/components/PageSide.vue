<template>
  <div class="pageAside">
    <section class="asideSection">
      <h2>연관 검색어</h2>
      <ol class="relatedList">
        <li>
          <a href="#" class="keyword">구매요청</a
          ><a href="#" class="btnDel"><span class="hidden">삭제</span></a>
        </li>
      </ol>
    </section>
    <section class="asideSection">
      <h2>인기검색어</h2>
      <ul class="tabMenu">
        <li class="on"><a href="#" @click="kListFilter('week')">이번주</a></li>
        <li><a href="#" @click="kListFilter('month')">이번달</a></li>
      </ul>
      <ol
        class="popularList tabContent"
        id="popularWeekList"
        style="display: block"
      >
        <li v-for="(item, index) in kList" :key="index">
          <a href="#" v-if="index < 5"
            ><em class="num">{{ index + 1 }}</em
            ><span class="keyword" @click="kSearch(item.key)">{{
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
  computed: {
    ...mapState({
      language: (state) => state.language,
      kList: (state) => state.kList,
      term: (state) => state.term,
    }),
  },
  created() {
    this.$store.dispatch("KeywordOfSearch", { term: this.term });
  },
  methods: {
    kSearch(keyword) {
      this.$store.dispatch("SearchWord", { word: keyword });
    },
    kListFilter(term) {
      this.$store.dispatch("KeywordOfSearch", { term: term });
    },
  },
};
</script>

<style>
</style>
<template>
  <span>
    <li
      class="pageon"
      :class="{ on: pageNumTrue(index + (nowpage - 1) * perpagecnt) }"
      v-for="index in vforcnt"
      :key="index"
    >
      <!-- <span v-if="category === 'person'">
        <router-link
          :to="`/ematesearch/${category}/page?page=${
            index + (nowpage - 1) * perpagecnt
          }`"
          class="link"
        >
          <span>{{ index + (nowpage - 1) * perpagecnt }}</span>
        </router-link>
      </span> -->
      <router-link
        :to="`/ematesearch/${category}/page?page=${
          index + (nowpage - 1) * perpagecnt
        }`"
        class="link"
      >
        <span>{{ index + (nowpage - 1) * perpagecnt }}</span>
      </router-link>
    </li>
    <!-- ### 활성화 메뉴 클래스 "on" 추가 ### -->
  </span>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["vforcnt"],
  methods: {
    pageNumTrue(pagenum) {
      if (pagenum - 1 == this.data.pagenum) return true;
      else false;
    },
  },
  computed: {
    ...mapState({
      nowpage: (state) => state.nowpage,
      perpagecnt: (state) => state.perpagecnt,
      data: (state) => state.data,
      category: (state) => state.data.class,
    }),
  },
};
</script>

<style>
</style>
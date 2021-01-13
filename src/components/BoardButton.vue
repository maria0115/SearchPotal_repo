<template>
  <span>
    <li
      class="pageon"
      :class="{ on: pageNumTrue(index + (nowpage - 1) * perpagecnt) }"
      v-for="index in vforcnt"
      :key="index"
    >
      <router-link
        :to="`/board/approval/page?page=${index + (nowpage - 1) * perpagecnt}`"
      >
        <a href="#" class="link">
          <span>{{ index + (nowpage - 1) * perpagecnt }}</span>
        </a>
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
    }),
  },
};
</script>

<style>
</style>
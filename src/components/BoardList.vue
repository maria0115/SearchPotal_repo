<template>
  <span v-if="this.sortdata.category">
    <!-- <span v-if="Array.isArray(this.sortdata.category.approval) && this.sortdata.category.approval.length>0"> -->
    <li v-for="(data, index) in sortdata.category.approval" :key="index">
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
          <span class="attch"><span class="hidden">첨부파일</span></span>
        </a>
      </router-link>
    </li>
  </span>
</template>
<script>
import { mapState } from "vuex";
export default {
  //     created() {
  //     bus.$emit('off:progress');
  //   },
  computed: {
    ...mapState({
      sortdata: (state) => state.sortdata,
    }),
  },
};
</script>

<style>
</style>
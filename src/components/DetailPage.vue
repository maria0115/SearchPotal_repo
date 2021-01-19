<template>
  <div>
    상세페이지
    <br />
    --------------------------------------------
    <br />

    <div v-if="sortdata[index].category === 'person'">
      이름: {{ sortdata[index].subject }} <br />
      부서: {{ sortdata[index].body.dept }} <br />
      직급: {{ sortdata[index].body.jobTitle }} <br />
      직책: {{ sortdata[index].body.jobPosition }} <br />
      회사: {{ sortdata[index].body.company }} <br />
      휴대폰: {{ sortdata[index].body.phone }} <br />
      자택: {{ sortdata[index].body.tel }} <br />
      E-mail: {{ sortdata[index].body.email }} <br />
      담당업무: {{ sortdata[index].body.job }} <br />
      created: {{ sortdata[index].created }} <br />
    </div>
    <div v-else-if="sortdata[index].category === 'approval'">
      제목 : {{ sortdata[index].subject }}
      <br />
      <br />
      작성자 : {{ sortdata[index].from }}
      <br />
      <br />
      작성일자 : {{ sortdata[index].created }}
      <br />
      <br />
      내용 : {{ sortdata[index].body }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      index: 0,
    };
  },
  created() {
    this.index = this.$route.params.index;

    // var moment = require("moment");
    //     for (var i = 0; i < this.sortdata.length; i++) {
    //         this.sortdata[i].created = moment(this.sortdata[i].created).add(9, "h").format("YYYYMMDDTHHmmssZ");
    //     }
  },
  computed: {
    ...mapState({
      sortdata: (state) => state.sortdata,
    }),
  },
};
</script>

<style>
</style>
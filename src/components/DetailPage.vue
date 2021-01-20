<template>
  <div>
    상세페이지
    <br />
    --------------------------------------------
    <br />
    <div v-if="arr[1] === 'person'">
      {{ personData.data[index].body }}
      이름: {{ personData.data[index].subject }} <br />
      부서: {{ personData.data[index].body.dept }} <br />
      직급: {{ personData.data[index].body.jobTitle }} <br />
      직책: {{ personData.data[index].body.jobPosition }} <br />
      회사: {{ personData.data[index].body.company }} <br />
      휴대폰: {{ personData.data[index].body.phone }} <br />
      자택: {{ personData.data[index].body.tel }} <br />
      E-mail: {{ personData.data[index].body.email }} <br />
      담당업무: {{ personData.data[index].body.job }} <br />
      created: {{ personData.data[index].created }} <br />
    </div>
    <div v-if="arr[1] === 'approval'">
      제목 : {{ approData.data[index].subject }}
      <br />
      <br />
      작성자 : {{ approData.data[index].from }}
      <br />
      <br />
      작성일자 : {{ approData.data[index].created }}
      <br />
      <br />
      내용 : {{ approData.data[index].body }}
    </div>
    <div v-if="arr[1] === 'board'">
      제목 : {{ boardData.data[index].subject }}
      <br />
      <br />
      작성자 : {{ boardData.data[index].from }}
      <br />
      <br />
      작성일자 : {{ boardData.data[index].created }}
      <br />
      <br />
      내용 : {{ boardData.data[index].body }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      index: 0,
      arr: [],
    };
  },
  created() {
    this.index = this.$route.params.index;
    this.arr = this.index.split(" ");
    if (this.arr.length > 1) {
      this.index = this.arr[0];
    }

    // var moment = require("moment");
    //     for (var i = 0; i < this.sortdata.length; i++) {
    //         this.sortdata[i].created = moment(this.sortdata[i].created).add(9, "h").format("YYYYMMDDTHHmmssZ");
    //     }
  },
  computed: {
    ...mapState({
      sortdata: (state) => state.sortdata,
      approData: (state) => state.approData,
      boardData: (state) => state.boardData,
      personData: (state) => state.personData,
    }),
  },
};
</script>

<style>
</style>
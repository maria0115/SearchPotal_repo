<template>
<div>
    상세페이지
    <br>
    --------------------------------------------
    <br>
    제목 : {{sortdata.category.approval[this.index].subject}}
    <br>
    <br>
    작성자 : {{sortdata.category.approval[this.index].from}}
    <br>
    <br>
    작성일자 : {{sortdata.category.approval[this.index].created}}
    <br>
    <br>
    내용 : {{sortdata.category.approval[this.index].body}}
</div>
  
</template>

<script>
import {mapState} from "vuex";
export default {
    data(){
        return{
            index:0,
        }
    },
    created(){
        this.index = this.$route.params.index;

    },
    computed:{
        ...mapState({
      sortdata: (state) => state.sortdata,
    }),
    }

}
</script>

<style>

</style>
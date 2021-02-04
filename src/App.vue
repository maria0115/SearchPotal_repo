<template>
  <div id="app">
    <spinner :loading="tf"></spinner>
    <div class="page">
      <Header></Header>
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import test1 from "./js/jquery.js";
import test2 from "./js/jquery-ui.js";
import test3 from "./portal/js/test2.js";
import test4 from "./portal/js/test.js";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Person from "./components/Person";
import Spinner from "./components/Spinner.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState({
      data: (state) => state.data,
      tf: (state) => state.tf,
    }),
  },
  components: {
    Header,
    Body,
    Footer,
    Person,
    Spinner,
  },
  created() {
    // var locale = this.$cookies.get("language");
    this.$store.dispatch("LanguageFetchData");
  },
};
</script>

<style>
@import "./portal/css/common.css";
@import "./portal/css/search.css";
@import "./portal/css/lib.min.css";
</style>
<template>
  <div id="app">
    <div class="page">
      <Header></Header>
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import test1 from './js/jquery.js'
import test2 from './js/jquery-ui.js'
import test3 from './portal/js/test2.js'
import test4 from './portal/js/test.js'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

export default {
  name: 'App',
  components:{
    Header,
    Body,
    Footer
  }
}

</script>

<style>
@import "./portal/css/common.css";
@import "./portal/css/search.css";
@import "./portal/css/lib.min.css";
</style>
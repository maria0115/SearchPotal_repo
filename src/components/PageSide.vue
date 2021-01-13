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
        <li class="on"><a href="#popularWeekList">이번주</a></li>
        <li><a href="#popularMonthList">이번달</a></li>
      </ul>
      <ol class="popularList tabContent" id="popularWeekList" style="display: block">
        <li>
          <a href="#"><em class="num">1</em><span class="keyword">플랫폼</span></a>
        </li>
      </ol>
      <ol class="popularList tabContent" id="popularMonthList" style="display: none">
        <li>
          <a href="#"><em class="num">1</em><span class="keyword">플랫폼1</span></a>
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
<template>
  <div class="pageContainer">
    <div class="pageContent">
      <section class="resultSection">
        <h2 class="title">임직원 <span class="cnt">92</span></h2>
        <ul class="employeeList">
          <li>
            <a href="#">
              <span class="thumb"
                ><img src="../portal/images/_emp_thumb_x76_01.png" alt=""
              /></span>
              <span class="name kor">안지원</span>
              <span class="name eng">Ahn Ji Won</span>
              <span class="team">전략구매팀</span>
            </a>
          </li>
        </ul>
        <a href="#" class="btnMore">MORE</a>
      </section>
      <section class="resultSection">
        <h2 class="title">부서 <span class="cnt">52</span></h2>
        <ul class="departmentList">
          <li>
            <a href="#">
              <span class="dept">구매지원실</span>
              <span class="company">게임빌</span>
              <span class="team">게임빌 &gt; 구매지원팀</span>
            </a>
          </li>
        </ul>
        <a href="#" class="btnMore">MORE</a>
      </section>
      <section class="resultSection">
        <h2 class="boardTitle">전자결재</h2>
        <ul class="boardList">
          <li>
            <a href="#">
              <span class="location">게임빌 &gt; 결재 &gt; 진행함</span>
              <span class="subject"
                >무선 AP 및 무선 AP 컨트롤러 라이선스 구매 합의(요청)</span
              >
              <span class="write"
                >안지원 매니저 / 전략구매팀
                <span class="date">2020.07.31</span></span
              >
              <span class="content"
                >1. 목적 가. 본사 10층 MCNS, 11층 SKC HT&M 13층 기업문화실
                Mobile Office 구축을 위한 무선 AP구매 나. 기 도입한 무선 AP
                컨트롤러 라이선스 부족으로, 추가 구매 필요</span
              >
              <span class="attch"><span class="hidden">첨부파일</span></span>
            </a>
          </li>
        </ul>
        <router-link :to="`/board/approval`">
        <a href="#" class="btnMore">MORE</a></router-link>
      </section>
      <section class="resultSection">
        <h2 class="boardTitle">게시판</h2>
        <ul class="boardList">
          <li>
            <a href="#">
              <span class="location"
                >컴투스 &gt; 업무지원 &gt; 일반가이드 &gt; 인사실</span
              >
              <span class="subject">구매 절차 안내</span>
              <span class="write"
                >박윤희 매니저 / 전략구매팀
                <span class="date">2020.08.03</span></span
              >
              <span class="content"
                >다음과 같이 구글 드라이브 용량 업그레이드 비용을 처리하고자
                합니다.</span
              >
            </a>
          </li>
        </ul>
        <a href="#" class="btnMore">MORE</a>
      </section>
    </div>

    <PageSide></PageSide>

  </div>
</template>

<script>
import PageSide from './PageSide'

export default {
    components: {
        PageSide
    }
};
</script>

<style>
</style>
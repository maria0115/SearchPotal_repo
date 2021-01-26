import Vue from 'vue';
import VueX from 'vuex';
import config from '../config.json'
import actions from './actions.js';
import mutations from './mutations.js';
Vue.use(VueX);

export const store = new VueX.Store({
    state: {
        rList: {},
        kList: {},
        term: "thisWeek",
        sortdata: {},
        approData: {},
        boardData: {},
        personData: {},
        data: {
            from: 1, // 받아온 데이터의 page
            size: config.defaultSize,
            fieldname: config.what[2],
            searchword: " ",
            searchwordarr: [], // AND 검색일 경우
            accOrrec: config.what[0],
            aOrd: config.defaultSort, // desc
            class: 'all', // category (all은 전체검색)
            pagenum: 0, // 보낼 데이터의 page
            check: false, // AND 검색을 하는지
            dateType: "all", // 날짜 필터 (all은 모든 날짜)
            gte: "default", // 날짜 필터의 값 (now-1d ...)
            lt: "", // 날짜 필터의 값 (now-1d ...)
            utc: config.timezone,
            created: "", // 현재 시각
        },
        //다국어
        language: {},
        languageoption: config.options,
        languageoptionselected: "ko",
        replaceword: { count: 0, word: "" },
        // 전자결제 페이지
        nowpage: 1,
        totalpage: 0,
        remainder: 0,
        remainderpages: [],
        perpagecnt: config.defaultPageCnt,
        perpage: 0,
        lastpage: 0,
        totalperpagecnt: 0,
    },
    mutations,
    actions,
    getters: {

        GetNowpage: (state) => {
            return state.nowpage;
        }
    },

})
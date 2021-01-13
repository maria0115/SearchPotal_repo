import Vue from 'vue';
import VueX from 'vuex';
import config from '../config.json'
import actions from './actions.js';
import mutations from './mutations.js';
Vue.use(VueX);

export const store = new VueX.Store({
    state: {
        sortdata: {},
        data: {
            from: 1,
            size: config.defaultSize,
            fieldname: config.what[2],
            searchword: " ",
            searchwordarr: [],
            accOrrec: config.what[0],
            aOrd: config.defaultSort,
            index: '_all',
            pagenum: 0,
            check: false,
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
        perpagecnt:config.defaultPageCnt,
        perpage:0,
        lastpage:0,
        totalperpagecnt:0,
    },
    mutations,
    actions,
    getters: {

        GetNowpage: (state) => {
            return state.nowpage;
        }
    },

})
import { GetLanguage, Search, WeekMonth } from '../api/index.js';
import config from '../config.json';
export default {
    // 헤더에 있는 메뉴 클릭시 카테고리 변경
    BigCategory({ state, commit }, category) {
        state.tf = true;
        var data = state.data;
        data.pagenum = config.defaultPageNum - 1;
        // 전체 검색일 때 size
        if (category == "all") {
            data.size = config.defaultHomeSize;
        } else {
            data.size = config.defaultSize;
        }
        data.class = category;

        commit('setTime');
        data.term = state.term;
        data.current = state.current;
        data.sessionId = state.sessionId;

        return Search(data)
            .then(response => {
                commit('BigCategory', { res: response.data, category: category });

                commit('SearchData', {
                    res: response.data.data, word: state.data.searchword, page: state.data.pagenum,
                    replaceword: state.data.searchword, what: state.data.what, whatfield: state.data.whatfield
                });

                state.tf = false;
            });
    },
    // 카테고리
    setClass({ state, commit }, className) {
        state.data.class = className;
    },
    //검색
    SearchWord({ state, commit, dispatch }, { word }) {
        state.tf = true;
        var data = state.data;
        if (word !== undefined) {
            data.searchword = word;
            if (state.data.check && word.length > 0) {
                data.searchwordarr.push(word);
            } else {
                data.searchwordarr = [];
                data.searchwordarr.push(word);

                var count = 0;
                for (var i = 0; i <= word.length; i++) {
                    var sword = word.split(" ");
                    if (sword[i] == "") {
                        if (count == word.length) {
                            data.searchwordarr = [];
                        }
                        count += 1;
                    }
                }
            }
        }
        var pagenum = config.defaultPageNum - 1;
        data.pagenum = pagenum;
        data.term = state.term;

        if (data.class === "all") {
            data.size = config.defaultHomeSize;
            state.data.size = data.size;
        }

        commit('setTime');
        data.current = state.current;
        data.sessionId = state.sessionId;

        return Search(data)
            .then(response => {
                console.log('검색 결과 : ', response);

                commit('SearchData', { res: response.data.data, word: word, page: pagenum, replaceword: data.searchword });
                commit('setList', { popular: response.data.popular, relation: response.data.relation });

                dispatch("LanguageFetchData");
                state.tf = false;
            });

    },
    // 인기검색어 필터
    KSearch({ state, commit }, { term }) {
        commit('setTime');
        return WeekMonth({ term: term, created: state.data.created, current: state.current, sessionId: state.sessionId })
            .then(response => {
                commit('popularList', { popular: response.data, term: term });
            });
    },
    // 필터 선택시
    FilterData({ commit, state }, { what, whatfield, gte, lt }) {
        var data = state.data;

        data.pagenum = 0;

        if (data.class == "all") {
            data.size = config.defaultHomeSize;
        } else {
            data.size = config.defaultSize;
        }

        data[whatfield] = what;
        if (typeof gte == "undefined" || typeof gte == undefined || gte == null || gte == "") {
        } else {
            data.gte = gte;
        }
        if (typeof lt == "undefined" || typeof lt == undefined || lt == null || lt == "") {
        } else {
            data.lt = lt;
        }

        commit('setTime');
        data.current = state.current;
        data.term = state.term;
        data.sessionId = state.sessionId;

        return Search(data)
            .then(response => {
                commit('SearchData', { what: what, whatfield: whatfield, res: response.data.data, replaceword: data.searchword });
            });

    },
    // 페이지
    PageSearch({ commit, state }, { page, size }) {
        state.tf = true;
        var data = state.data;
        // data.pagenum = page;
        data.pagenum = page * data.size;

        data.size = size;

        commit('setTime');
        data.current = state.current;
        data.term = state.term;
        data.sessionId = state.sessionId;

        return Search(data)
            .then(response => {
                commit('SearchData', { res: response.data.data, page: page, size: size, replaceword: data.searchword });
                state.tf = false;
            });

    },
    // 언어
    LanguageFetchData({ commit, state }) {
        var data = {};
        // data["locale"] = locale;
        // data["sessionId"] = sessionId;
        var sortdata = state.sortdata;
        var getdata = state.data;
        data['total_cnt'] = 0;
        if (sortdata.total_cnt !== undefined && sortdata.total_cnt !== 0) {

            data['total_cnt'] = sortdata.total_cnt;
        }
        data.searchword = getdata.searchword;
        data.searchwordarr = state.data.searchwordarr;

        // state.languageoptionselected = locale;
        // state.sessionId = sessionId;

        commit('setTime');
        data.current = state.current;

        return GetLanguage(data)
            .then(response => {
                commit('LanguageData', { data: response.data });
            });
    },
}
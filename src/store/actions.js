import { GetLanguage, Search, keywordofsearch } from '../api/index.js';
import config from '../config.json';
export default {
    // 헤더에 있는 메뉴 클릭시 카테고리 변경
    BigCategory({ state, commit }, category) {
        console.log('bigcategory', category);
        var data = state.data;
        data.pagenum = config.defaultPageNum - 1;
        if (category == "all") {
            data.size = config.defaultHomeSize;
        } else {
            data.size = config.defaultSize;
        }
        data.class = category;

        commit('setTime');

        console.log('헤더 클릭 ', data);

        return Search(data)
            .then(response => {
                commit('BigCategory', { res: response, category: category });
                commit('SearchData', {
                    res: response.data, word: state.data.searchword, page: state.data.pagenum,
                    replaceword: state.data.searchword, what: state.data.what, whatfield: state.data.whatfield
                });

                console.log('헤더 클릭 결과 ', response);
            });
    },
    // 카테고리
    setClass({ state, commit }, className) {
        state.data.class = className;
    },
    // 인기검색어
    KeywordOfSearch({ state, commit }, { term }) {
        commit('setTime');
        state.term = term;
        var data = {};
        data.term = term;
        data.date = state.data.created;
        return keywordofsearch(data)
            .then(response => {
                commit('kSearch', { res: response });
            });
    },
    //검색
    SearchWord({ state, commit, dispatch }, { word }) {
        var data = state.data;
        if (word !== undefined) {
            data.searchword = word;
            if (state.data.check && word.length > 0) {
                data.searchwordarr.push(word);
            } else {
                data.searchwordarr = [];
                data.searchwordarr.push(word);
            }
        }
        var pagenum = config.defaultPageNum - 1;
        data.pagenum = pagenum;

        commit('setTime');

        console.log('검색 버튼 클릭 ', data);

        return Search(data)
            .then(response => {
                dispatch("KeywordOfSearch", { term: state.term });
                commit('SearchData', { res: response.data, word: word, page: pagenum, replaceword: data.searchword });

                console.log('검색 버튼 클릭 결과 ', response);
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

        console.log('필터 클릭 ', data);

        return Search(data)
            .then(response => {
                commit('SearchData', { what: what, whatfield: whatfield, res: response.data, replaceword: data.searchword });

                console.log('필터 클릭 결과 ', response);
            });

    },
    // 페이지
    PageSearch({ commit, state }, { page, size }) {
        var data = state.data;
        // data.pagenum = page;
        data.pagenum = page * data.size;

        data.size = size;

        commit('setTime');

        console.log('페이지 번호 클릭 ', data);

        return Search(data)
            .then(response => {
                console.log('페이지 번호 클릭 결과 ', response);
                commit('SearchData', { res: response.data, page: page, size: size, replaceword: data.searchword });
            });

    },
    LanguageFetchData({ commit, state }, localevalue) {
        var data = {};
        data["locale"] = localevalue;
        // console.log(JSON.stringify(data));
        var sortdata = state.sortdata;
        var getdata = state.data;
        data['total_cnt'] = 0;
        if (sortdata.total_cnt !== undefined && sortdata.total_cnt !== 0) {

            data['total_cnt'] = sortdata.total_cnt;
        }
        data.searchword = getdata.searchword;
        data.searchwordarr = state.data.searchwordarr;

        return GetLanguage(data)
            .then(response => {
                console.log('언어 결과 ', response.data);
                commit('LanguageData', { data: response.data });
            });
    }

}
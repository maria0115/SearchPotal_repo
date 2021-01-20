import { GetLanguage, Search } from '../api/index.js';
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

        console.log('fffffffffff111 ', data);

        return Search(data)
            .then(response => {
                commit('BigCategory', { res: response, category: category });
                commit('SearchData', {
                    res: response.data, word: state.data.searchword, page: state.data.pagenum,
                    replaceword: state.data.searchword, what: state.data.what, whatfield: state.data.whatfield
                });

                console.log('aaaaaaaaaaaaaaa', response);
            });
    },
    // 카테고리
    setClass({ state, commit }, className) {
        state.data.class = className;   
    },
    //검색
    SearchWord({ state, commit }, { word }) {
        console.log(state.sortdata.total_cnt, "****************searchword");
        var data = state.data;
        if (word !== undefined) {
            data.searchword = word;
            if (state.data.check && word.length > 0) {
                console.log(word, "action");
                data.searchwordarr.push(word);
            } else {
                data.searchwordarr = [];
                data.searchwordarr.push(word);
            }
        }
        console.log(data.searchwordarr, "searchwordarr");
        var pagenum = config.defaultPageNum - 1;
        data.pagenum = pagenum;

        commit('setTime');

        console.log('fffffffffff222 ', data);

        return Search(data)
            .then(response => {
                commit('SearchData', { res: response.data, word: word, page: pagenum, replaceword: data.searchword });

                console.log('seach ********** ++++++++++++ ------------', response);
            });

    },
    // 필터 선택시
    FilterData({ commit, state }, { what, whatfield, gte, lt }) {
        var data = state.data;

        if (data.class == "all") {
            data.size = config.defaultHomeSize;
        } else {
            data.size = config.defaultSize;
        }

        data[whatfield] = what;
        if (typeof gte == "undefined" || typeof gte == undefined || gte == null || gte == "") {
            console.log('wwwwwwwwwwww ', data.gte);
        } else {
            data.gte = gte;
        }
        if (typeof lt == "undefined" || typeof lt == undefined || lt == null || lt == "") {
            console.log('hhhhhhhhhhhhh  ', data.lt);
        } else {
            data.lt = lt;
        }

        commit('setTime');

        console.log('fffffffffff333 ', data);

        return Search(data)
            .then(response => {
                commit('SearchData', { what: what, whatfield: whatfield, res: response.data, replaceword: data.searchword });

                console.log('aaaaaaaaaaaaaaa', response);
            });

    },
    // 페이지
    PageSearch({ commit, state }, { page, size }) {
        var data = state.data;
        data.pagenum = page;
        data.size = size;
        console.log("PageSearch 왔다");
        console.log(page, size);
        console.log(data);

        commit('setTime');

        console.log('fffffffffff444 ', data);

        return Search(data)
            .then(response => {
                console.log(response);
                commit('SearchData', { res: response.data, page: page, size: size, replaceword: data.searchword });

                console.log('aaaaaaaaaaaaaaa', response);
            });

    },
    LanguageFetchData({ commit, state }, localevalue) {
        var data = {};
        data["locale"] = localevalue;
        console.log(JSON.stringify(data));
        var sortdata = state.sortdata;
        var getdata = state.data;
        data['total_cnt'] = 0;
        if (sortdata.total_cnt !== undefined && sortdata.total_cnt !== 0) {

            data['total_cnt'] = sortdata.total_cnt;
        }
        data.searchword = getdata.searchword;
        console.log(data, "language");

        console.log('ffffffffffflanguage ', data);

        return GetLanguage(data)
            .then(response => {
                console.log(response.data);
                commit('LanguageData', { data: response.data });
            });
    }

}
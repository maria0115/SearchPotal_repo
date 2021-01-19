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
        var pagenum = config.defaultPageNum - 1;
        data.pagenum = pagenum;

        commit('setTime');

        console.log('fffffffffff222 ', data);

        return Search(data)
            .then(response => {
                commit('SearchData', { res: response.data, word: word, page: pagenum, replaceword: data.searchword });
            });

    },
    // 필터 선택시
    FilterData({ commit, state }, { what, whatfield, gte }) {
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

        commit('setTime');

        console.log('fffffffffff333 ', data);

        return Search(data)
            .then(response => {
                commit('SearchData', { what: what, whatfield: whatfield, res: response.data, replaceword: data.searchword });
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
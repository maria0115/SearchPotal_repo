import { GetLanguage, Search } from '../api/index.js';
import config from '../config.json';
export default {
    BigCategory({ state, commit }, category) {
        console.log('bigcategory', category);
        var data = state.data;
        data.pagenum = config.defaultPageNum - 1;
        data.size = config.defaultSize;
        data.class = category;


        console.log('fffffffffff111 ' , data );

        return Search(data)
            .then(response => {
                commit('BigCategory', { res: response, category: category });
            });
    },
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
            }
        }
        var pagenum = config.defaultPageNum - 1;
        data.pagenum = pagenum;

        console.log('fffffffffff222 ' , data );

        return Search(data)
            .then(response => {
                commit('SearchData', { res: response.data, word: word, page: pagenum, replaceword: data.searchword });
            });

    },
    FilterData({ commit, state }, { what, whatfield, gte }) {
        var data = state.data;
        data[whatfield] = what;
        data.gte = gte;

        console.log('fffffffffff333 ' , data );

        return Search(data)
            .then(response => {
                commit('SearchData', { what: what, whatfield: whatfield, res: response.data, replaceword: data.searchword });
            });

    },
    PageSearch({ commit, state }, { page, size }) {
        var data = state.data;
        data.pagenum = page;
        data.size = size;
        console.log("PageSearch 왔다");
        console.log(page, size);
        console.log(data);

        console.log('fffffffffff444 ' , data );

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

        console.log('ffffffffffflanguage ' , data );

        return GetLanguage(data)
            .then(response => {
                console.log(response.data);
                commit('LanguageData', { data: response.data });
            });
    }

}
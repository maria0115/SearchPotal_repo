import Vue from 'vue'
import Router from 'vue-router'
import Body from '@/components/Body'
import Board from '@/components/Board'
import Person from '@/components/Person';
import DetailPage from '@/components/DetailPage';
import { store } from '../store/index.js';
import bus from '../utils/bus.js';

Vue.use(Router)
import config from '../config.json';
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/all'
    },
    {
      path: '/:id',
      name: 'Body',
      component: Body
    },
    {
      path: '/board/:id',
      name: 'Board',
      component: Board,
      children: [
        {
          name: 'page',
          path: 'page',
          // component: BoardList,
          // props: true,
          beforeEnter(routeTo, routeFrom, next) {
            bus.$emit('on:progress');
            var query = routeTo.query;
            var nowpage = store.state.nowpage;
            var totalperpagecnt = store.state.totalperpagecnt;
            var totalpage = store.state.totalpage;
            var remainder = store.state.remainder;
            var perpage = store.state.perpage;

            var page = 0;

            if (query.name) {
              var nowpagechange = 1;

              console.log(page, "page와이라노,,");
              if (query.name == 'prev' && nowpage > 1) {
                page = (nowpage - 2) * store.state.perpagecnt + config.defaultPageNum;
                nowpagechange = nowpage - 1;
              }
              else if (query.name == 'next' && totalperpagecnt >= nowpage) {
                if (remainder === 0 && nowpage === totalperpagecnt && perpage === 0) {
                  nowpagechange = totalperpagecnt;
                  page = totalpage;
                } else {
                  nowpagechange = nowpage + 1;
                  page = nowpage * store.state.perpagecnt + config.defaultPageNum;

                }

              }
              else if (query.name == 'last') {
                if (remainder > 0) {
                  nowpagechange = totalperpagecnt + 1;
                  page = totalpage + 1;
                } else {
                  nowpagechange = totalperpagecnt + 1;
                  page = totalpage;
                }
              }
              else if (query.name == 'first') {
                nowpagechange = 1;
                page = 1;
              }
              store.commit("NowPageChange", nowpagechange);
            }
            else if (query.page && query.page > 0) {
              page = query.page;
            }
            var size = config.defaultSize;
            if (!(totalpage == 0) && page == totalpage + 1 && store.state.data.class) {
              size = remainder;
            }
            page--;

            store.dispatch("PageSearch", { page: page, size: size })
              .then(() => {
                bus.$emit('off:progress');
                next('/board/' + store.state.data.class);
              })
              .catch(() => new Error("failed to fetch boardlist"));
          },
        },
      ]
    },
    {
      path: '/person/:index',
      name: 'Person',
      component: Person,
      children: [
        {
          name: 'page',
          path: 'page',
          // component: BoardList,
          // props: true,
          beforeEnter(routeTo, routeFrom, next) {
            bus.$emit('on:progress');
            var query = routeTo.query;
            var nowpage = store.state.nowpage;
            var totalperpagecnt = store.state.totalperpagecnt;
            var totalpage = store.state.totalpage;
            var remainder = store.state.remainder;
            var perpage = store.state.perpage;

            var page = 0;

            if (query.name) {
              var nowpagechange = 1;

              console.log(page, "page와이라노,,");
              if (query.name == 'prev' && nowpage > 1) {
                page = (nowpage - 2) * store.state.perpagecnt + config.defaultPageNum;
                nowpagechange = nowpage - 1;
              }
              else if (query.name == 'next' && totalperpagecnt >= nowpage) {
                if (remainder === 0 && nowpage === totalperpagecnt && perpage === 0) {
                  nowpagechange = totalperpagecnt;
                  page = totalpage;
                } else {
                  nowpagechange = nowpage + 1;
                  page = nowpage * store.state.perpagecnt + config.defaultPageNum;

                }

              }
              else if (query.name == 'last') {

                if (remainder > 0) {
                  nowpagechange = totalperpagecnt + 1;
                  page = totalpage + 1;
                } else {
                  nowpagechange = totalperpagecnt + 1;
                  page = totalpage;
                }
              }
              else if (query.name == 'first') {
                nowpagechange = 1;
                page = 1;
              }
              store.commit("NowPageChange", nowpagechange);
            }
            else if (query.page && query.page > 0) {
              page = query.page;
            }
            var size = config.defaultSize;
            if (!(totalpage == 0) && page == totalpage + 1 && store.state.data.class) {
              size = remainder;
            }
            page--;

            store.dispatch("PageSearch", { page: page, size: size })
              .then(() => {
                bus.$emit('off:progress');
                next('/person/person');
              })
              .catch(() => new Error("failed to fetch personList"));
          },
        },
      ]
    },
    {
      path: '/detail/:index',
      name: 'DetailPage',
      component: DetailPage
    },
  ]
})

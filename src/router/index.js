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
      redirect: '/ematesearch/allsearch'
    },
    {
      path: '/ematesearch',
      redirect: '/ematesearch/allsearch'
    },
    {
      path: '/ematesearch/allsearch',
      name: 'Body',
      component: Body
    },
    {
      path: '/ematesearch/person',
      name: 'Person',
      component: Person,
      children: [
        {
          name: 'page',
          path: 'page',
          // component: BoardList,
          // props: true,
          beforeEnter(routeTo, routeFrom, next) {
            store.dispatch("pageSetting", { routeTo: routeTo })
            .then(() => {
              next('/ematesearch/' + store.state.data.class);
            })
            .catch(() => new Error("failed to fetch boardlist"));
          },
        },
      ]
    },
    {
      path: '/ematesearch/board',
      name: 'Board',
      component: Board,
      children: [
        {
          name: 'page',
          path: 'page',
          // component: BoardList,
          // props: true,
          beforeEnter(routeTo, routeFrom, next) {
            store.dispatch("pageSetting", { routeTo: routeTo })
              .then(() => {
                next('/ematesearch/' + store.state.data.class);
              })
              .catch(() => new Error("failed to fetch boardlist"));
          },
        },
      ]
    },
    {
      path: '/ematesearch/approval',
      name: 'Board',
      component: Board,
      children: [
        {
          name: 'page',
          path: 'page',
          // component: BoardList,
          // props: true,
          beforeEnter(routeTo, routeFrom, next) {
            store.dispatch("pageSetting", { routeTo: routeTo })
              .then(() => {
                next('/ematesearch/' + store.state.data.class);
              })
              .catch(() => new Error("failed to fetch boardlist"));
          },
        },
      ]
    },
    {
      path: '/ematesearch/mail',
      name: 'Board',
      component: Board,
      children: [
        {
          name: 'page',
          path: 'page',
          // component: BoardList,
          // props: true,
          beforeEnter(routeTo, routeFrom, next) {
            store.dispatch("pageSetting", { routeTo: routeTo })
            .then(() => {
              next('/ematesearch/' + store.state.data.class);
            })
            .catch(() => new Error("failed to fetch boardlist"));
          },
        },
      ]
    },
  ]
})

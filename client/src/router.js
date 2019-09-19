import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import roomgame from './views/roomgame.vue'

import roomlist from './views/roomlist.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {

      path: '/room/:id',
      name: 'roomgame',
      component: roomgame
    },
    {
      path:"/roomlist",
      name :'roomlist',
      component : roomlist
    }
  ]
})

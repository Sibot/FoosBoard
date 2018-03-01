import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/components/Game'
import Blog from '@/components/Blog'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import store from '../vuex/index.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/game',
      name: 'Game',
      component: Game,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next()
        } else {
          next('/signin')
        }
      }
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import NewGame from '@/components/NewGame/NewGame'
import Blog from '@/components/Blog'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import store from '../vuex/index'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/game',
      name: 'NewGame',
      component: NewGame,
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

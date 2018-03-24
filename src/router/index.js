import Vue from 'vue'
import Router from 'vue-router'
import NewGame from '@/components/NewGame/NewGame'
import SignIn from '@/components/User/SignIn'
import SignUp from '@/components/User/SignUp'
import Profile from '@/components/User/Profile'
import store from '../vuex/index'
import Index from '@/components/Index/Index'

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
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next()
        } else {
          next('/signin')
        }
      }
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

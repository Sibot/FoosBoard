import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/Index'
import About from '@/components/About'
import Events from '@/components/Events'
import NewGame from '@/components/NewGame/NewGame'
import SignIn from '@/components/User/SignIn'
import SignUp from '@/components/User/SignUp'
import Profile from '@/components/User/Profile'
import store from '../vuex/index'

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
      path: '/about',
      name: 'About',
      component: About
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
      path: '/events',
      name: 'Events',
      component: Events,
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
        if (store.getters.isLoggedIn) {
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

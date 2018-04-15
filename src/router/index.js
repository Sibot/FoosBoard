import About from '@/components/About'
import Events from '@/components/Events/Events'
import History from '@/components/History'
import Index from '@/components/Index/Index'
import NewGame from '@/components/NewGame/NewGame'
import Profile from '@/components/User/Profile'
import SignIn from '@/components/User/SignIn'
import SignUp from '@/components/User/SignUp'
import Statistics from '@/components/Statistics'
import store from '../vuex/index'
import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

async function checkAuthState (to, from, next) {
  const isAuthenticated = await getAuthState()
  if (isAuthenticated === null) {
    next('/profile')
  } else {
    next()
  }
}
async function checkLoginState (to, from, next) {
  const isLoggedIn = await getLoginState()
  if (isLoggedIn === null) {
    next('/signin')
  } else {
    next()
  }
}

function getAuthState () {
  return new Promise((resolve, reject) => {
    if (store.state.isAuthenticated === null) {
      const unwatch = store.watch(
        () => store.state.isAuthenticated,
        value => {
          unwatch()
          resolve(value)
        }
      )
    } else {
      resolve(store.state.isAuthenticated)
    }
  })
}

function getLoginState () {
  return new Promise((resolve, reject) => {
    if (store.state.isLoggedIn === null) {
      const unwatch = store.watch(
        () => store.state.isLoggedIn,
        value => {
          unwatch()
          resolve(value)
        }
      )
    } else {
      resolve(store.state.isLoggedIn)
    }
  })
}
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: Statistics
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
    },
    // Require user state
    {
      path: '/game',
      name: 'NewGame',
      component: NewGame,
      beforeEnter: checkAuthState
    },
    {
      path: '/events',
      name: 'Events',
      component: Events,
      beforeEnter: checkAuthState
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: checkLoginState
    }
  ]
})

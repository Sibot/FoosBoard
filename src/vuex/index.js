import Vue from 'vue'
import Vuex from 'vuex'
import appService from '../app.service'

Vue.use(Vuex)

const state = {
  isAuthenticated: false,
  user: null
}

const store = new Vuex.Store({
  state,
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated
    },
    user: (state) => {
      var user = state.user
      return user
    }
  },
  actions: {
    logout (context) {
      context.commit('logout')
    },
    login (context, credentials) {
      return new Promise((resolve, reject) => {
        appService.login(credentials)
          .then((user) => {
            state.user = user
            state.isAuthenticated = true
            resolve()
          })
          .catch((response) => {
            reject(response)
          })
      })
    },
    updateProfile (context, newProfile) {
      return new Promise((resolve, reject) => {
        state.user.updateProfile(newProfile)
          .then(() => {
            resolve()
          }).catch((error) => {
            reject(error)
          })
      })
    }
  },
  mutations: {
    logout (state) {
      state.isAuthenticated = false
      state.user = null
    }
  }
})

export default store

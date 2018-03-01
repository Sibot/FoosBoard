import Vue from 'vue'
import Vuex from 'vuex'
import appService from '../app.service'
import firebase from 'firebase'

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
      return state.user || firebase.auth().currentUser
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

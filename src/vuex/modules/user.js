import appService from '../../app.service'
import firebase from 'firebase'

const state = {
  isAuthenticated: false,
  user: null
}

const getters = {
  isAuthenticated: state => {
    return state.isAuthenticated
  },
  user: state => {
    var user = state.user
    return user
  }
}
const actions = {
  signOut (context) {
    context.commit('signOut')
  },
  signIn (context, credentials) {
    return new Promise((resolve, reject) => {
      appService
        .signIn(credentials)
        .then(user => {
          state.user = user
          state.isAuthenticated = true
          resolve()
        })
        .catch(response => {
          reject(response)
        })
    })
  },
  signUp (context, credentials) {
    return new Promise((resolve, reject) => {
      appService
        .signUp(credentials)
        .then(user => {
          state.user = user
          state.isAuthenticated = true
          resolve()
        })
        .catch(response => {
          reject(response)
        })
    })
  },
  updateProfile (context, newProfile) {
    return new Promise((resolve, reject) => {
      state.user
        .updateProfile(newProfile)
        .then(() => {
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  sendVerificationEmail (context) {
    return new Promise((resolve, reject) => {
      state.user
        .sendEmailVerification()
        .then(() => {
          resolve()
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
}
const mutations = {
  signOut (state) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Todo handle success/fail
      })
    state.isAuthenticated = false
    state.user = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

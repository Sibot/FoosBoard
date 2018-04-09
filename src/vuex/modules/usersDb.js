import firebase from '../../firebaseInit'
import 'firebase/auth'

const state = {
  isAuthenticated: null,
  isLoggedIn: null,
  user: null,
  userPromise: null
}

const getters = {
  isAuthenticated: state => {
    return state.isAuthenticated
  },
  isLoggedIn: state => {
    return state.isLoggedIn
  },
  user: state => {
    return state.user
  },
  userPromise: state => {
    return state.userPromise
  }
}

const actions = {
  initUsers ({ commit, dispatch, getters }) {
    if (!getters.userPromise) {
      commit(
        'setUserPromise',
        new Promise((resolve, reject) => {
          firebase.auth().onAuthStateChanged(function (user) {
            dispatch('updateIsAuthenticated', user).then(() => {
              resolve()
            })
          })
        })
      )
    }
    return getters.userPromise
  },
  signOut (context) {
    firebase.auth().signOut()
  },
  signIn (context, credentials) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(resolve)
        .catch(error => {
          reject(error)
        })
    })
  },
  signUp ({ dispatch }, credentials) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(user => {
          dispatch('initUsers').then(() => {
            dispatch('setProfile', {
              displayName: credentials.displayName
            })
              .then(() => {
                resolve()
              })
              .catch(error => {
                dispatch('addNotification', {
                  title: 'Error',
                  body: error.message,
                  tag: 'error'
                })
              })
          })
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  sendVerificationEmail ({ getters }) {
    return new Promise((resolve, reject) => {
      getters.user
        .sendEmailVerification()
        .then(() => {
          resolve()
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  updateIsAuthenticated ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('updateIsAuthenticated', user)
      resolve()
    })
  }
}
const mutations = {
  updateIsAuthenticated (state, user) {
    if (user) {
      state.isLoggedIn = true
      if (user.emailVerified) {
        state.isAuthenticated = true
      }
      state.user = user
      return
    }
    state.isAuthenticated = false
    state.isLoggedIn = false
    state.user = null
  },
  setUserPromise (state, userPromise) {
    state.userPromise = userPromise
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

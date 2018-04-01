import firebase from '../../firebaseInit'
import 'firebase/auth'

const state = {
  isAuthenticated: false,
  isLoggedIn: false,
  user: null
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
  }
}

const actions = {
  initUsers (context) {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function (user) {
        context.commit('updateIsAuthenticated', user)
        resolve()
      })
    })
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
          console.log(user.uid)
          dispatch('setProfile', {
            uid: user.uid,
            displayName: credentials.displayName
          })
            .then(() => {
              resolve()
            })
            .catch(error => {
              dispatch('addNotification', {
                title: 'Error',
                body: error.message
              })
            })
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
  updateIsAuthenticated (state, user) {
    return new Promise((resolve, reject) => {
      if (user) {
        state.isLoggedIn = true
        if (user.emailVerified) {
          state.isAuthenticated = true
        }
        state.user = user
        resolve()
        return
      }
      state.isAuthenticated = false
      state.isLoggedIn = false
      state.user = null
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

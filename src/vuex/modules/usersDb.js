import firebase from '../../firebaseInit'
import 'firebase/auth'

const state = {
  isAuthenticated: false,
  user: firebase.auth().currentUser
}

const getters = {
  isAuthenticated: state => {
    return state.isAuthenticated
  },
  user: state => {
    return state.user
  }
}
const actions = {
  initUsers (context) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        context.commit('updateIsAuthenticated', user)
      } else {
        context.commit('updateIsAuthenticated')
      }
    })
  },
  signOut (context) {
    context.commit('signOut')
  },
  signIn (context, credentials) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(user => {
          resolve(user)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  signUp (context, credentials) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
          resolve()
        })
        .catch(error => {
          reject(error)
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
  updateIsAuthenticated (state, newValue) {
    if (newValue) {
      window.localStorage.setItem('user', JSON.stringify(newValue))
      state.isAuthenticated = true
      state.user = newValue
      return
    }
    window.localStorage.removeItem('user')
    state.isAuthenticated = false
    state.user = null
  },
  signOut (state) {
    firebase.auth().signOut()
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

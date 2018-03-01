import axios from 'axios'
import * as firebase from 'firebase'

const appService = {
  getPosts () {
    return new Promise((resolve) => {
      axios.get(`https://public-api.wordpress.com/rest/v1.1/sites/fend14tobis.wordpress.com/posts`)
        .then(response => {
          resolve(response.data.posts)
        })
    })
  },
  login (credentials) {
    return new Promise((resolve, reject) => {
      firebase.auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((user) => {
          window.localStorage.setItem('user', user)
          resolve(user)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  logout () {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => {
          window.localStorage.removeItem('user')
        })
        .catch(() => {
        })
    })
  },
  getProfile () {
    return new Promise((resolve, reject) => {
      if (window) {
        var user = firebase.auth().currentUser
        if (user) {
          return { email: user.email, displayName: user.displayName, emailVerified: user.emailVerified }
        }
      }
    })
  },
  saveProfile (profile) {
    return new Promise((resolve, reject) => {
      this.getProfile().then((user) => {
        let updateObject = {}
        if (profile.displayName !== user.displayName) {
          updateObject.displayName = profile.displayName
        }
        user.updateProfile(updateObject)
      })
    })
  }
}

export default appService

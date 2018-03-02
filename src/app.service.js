import axios from 'axios'
import * as firebase from 'firebase'

const appService = {
  getPosts () {
    return new Promise(resolve => {
      axios
        .get(
          `https://public-api.wordpress.com/rest/v1.1/sites/fend14tobis.wordpress.com/posts`
        )
        .then(response => {
          resolve(response.data.posts)
        })
    })
  },
  signIn (credentials) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(user => {
          window.localStorage.setItem('user', JSON.stringify(user))
          resolve(user)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  signOut () {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          window.localStorage.removeItem('user')
        })
        .catch(() => {})
    })
  },
  signUp (credentials) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
          resolve()
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
}

export default appService

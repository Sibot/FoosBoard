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
  signUp (credentials) {
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
  }
}

export default appService

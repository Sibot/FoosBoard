import axios from 'axios'

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
  }
}

export default appService

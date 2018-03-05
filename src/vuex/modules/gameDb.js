import firebase from '../../firebaseInit'

let db = firebase.database()
let gamesRef = db.ref('games/')

const state = {
  games: gamesRef
}

const getters = {
  games: state => {
    return state.games
  }
}

const actions = {
  saveGame (context, game) {
    state.games.push(game)
  }
}

export default {
  state,
  getters,
  actions
}

import firebase from '../../firebaseInit'

let db = firebase.database()
let gamesDb = db.ref('games/')

const state = {
  gamesList: []
}

const getters = {
  gamesList: state => {
    return state.gamesList
  }
}

const mutations = {
  addGame (state, game) {
    state.gamesList.push(game)
  },
  saveGame (state, game) {
    gamesDb.push(game)
  },
  clearGamesList (state) {
    state.gamesList = []
  }
}

const actions = {
  initGames (context) {
    gamesDb.on('value', snap => {
      context.commit('clearGamesList')
      snap.forEach(snap => {
        var game = snap.val()
        game.key = snap.key
        context.commit('addGame', game)
      })
    })
  },
  saveGame (context, game) {
    context.commit('saveGame', game)
  }
}

export default {
  actions,
  getters,
  mutations,
  state
}

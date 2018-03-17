import firebase from '../../firebaseInit'

let db = firebase.database()
let gamesDb = db.ref('games/')

const state = {
  gamesList: [],
  topTenLatestGames: []
}

const getters = {
  gamesList: state => {
    return state.gamesList
  },
  topTenLatestGames: state => {
    return state.topTenLatestGames
  }
}

const mutations = {
  addGame (state, game) {
    state.gamesList.push(game)
  },
  addTopTenLatestGames (state, game) {
    state.topTenLatestGames.push(game)
  },
  saveGame (state, game) {
    gamesDb.push(game)
  },
  clearGamesList (state) {
    state.gamesList = []
  },
  clearTopTenLatestGames (state) {
    state.topTenLatestGames = []
  }
}

const actions = {
  initGames (context) {
    gamesDb.once('value', snap => {
      snap.forEach(snap => {
        var game = snap.val()
        game.key = snap.key
        context.commit('addGame', game)
      })
    })
    gamesDb
      .orderByChild('playedAt')
      .limitToFirst(10)
      .on('value', snap => {
        context.commit('clearTopTenLatestGames')
        snap.forEach(child => {
          var game = child.val()
          game.key = child.key
          context.commit('addTopTenLatestGames', game)
        })
      })
    gamesDb.on('child_added', snap => {
      var game = snap.val()
      game.key = snap.key
      context.commit('addGame', game)
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

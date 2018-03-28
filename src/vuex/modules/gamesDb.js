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

const actions = {
  initGames (context) {
    // gamesDb.once('value', snap => {
    //   snap.forEach(snap => {
    //     var game = snap.val()
    //     game.key = snap.key
    //     context.commit('addGame', game)
    //   })
    // })

    gamesDb.on('child_added', snap => {
      var game = snap.val()
      game.key = snap.key
      context.commit('addGame', game)
    })

    gamesDb
      .orderByKey()
      .limitToLast(9)
      .on('value', gameSnap => {
        context.commit('clearTopTenLatestGames')
        gameSnap.forEach(gameChild => {
          var game = gameChild.val()
          game.key = gameChild.key
          context.commit('addTopTenLatestGames', game)
        })
      })
  },
  saveGame (context, game) {
    context.commit('saveGame', game)
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

export default {
  actions,
  getters,
  mutations,
  state
}

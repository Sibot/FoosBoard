import firebase from '../../firebaseInit'

let db = firebase.database()
let playersRef = db.ref('players')

const state = {
  playersList: []
}

const getters = {
  playersList: state => {
    return state.playersList
  }
}

const mutations = {
  addPlayer (state, player) {
    state.playersList.push(player)
  },
  savePlayer (state, player) {
    playersRef.push(player)
  },
  clearPlayersList (state) {
    state.playersList = []
  }
}

const actions = {
  initPlayers (context) {
    playersRef.on('value', function (snapshot) {
      console.log(snapshot)
      context.commit('clearPlayersList')
      snapshot.forEach(snap => {
        console.log(snap.val())
        context.commit('addPlayer', { key: snap.key, name: snap.val() })
      })
    })
  },
  savePlayer (context, player) {
    context.commit('savePlayer', player)
  }
}

export default {
  actions,
  getters,
  mutations,
  state
}

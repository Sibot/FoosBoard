import firebase from '../../firebaseInit'

let db = firebase.database()
let playersRef = db.ref('players/')

playersRef.on('value', function (snapshot) {
  state.playersList = []
  snapshot.forEach(childSnapshot => {
    state.playersList.push(childSnapshot.val())
  })
})

const state = {
  playersDb: playersRef,
  playersList: []
}

const getters = {
  playersDb: state => {
    return state.playersDb
  },
  playersList: state => {
    return state.playersList
  }
}

const actions = {
  savePlayer (context, player) {
    state.playersDb.push(player)
  },
  updatePlayers (context) {}
}

export default {
  state,
  getters,
  actions
}

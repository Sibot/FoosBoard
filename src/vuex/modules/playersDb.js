import firebase from '../../firebaseInit'

let db = firebase.database()
let playersRef = db.ref('players')

const state = {
  playersList: [],
  profile: {}
}

const getters = {
  playersList: state => {
    return state.playersList
  },
  profile: state => {
    return state.profile
  }
}

const actions = {
  initPlayers (context) {
    playersRef.orderByChild('name').on('value', function (snapshot) {
      context.commit('clearPlayersList')
      snapshot.forEach(snap => {
        var player = snap.val()
        player.key = snap.key
        context.commit('addPlayer', player)
      })
    })
  },
  savePlayer (context, player) {
    context.commit('savePlayer', player)
  },
  setProfile (context, profile) {
    context.commit('setProfile', profile)
  }
}

const mutations = {
  addPlayer (state, player) {
    state.playersList.push(player)
  },
  clearPlayersList (state) {
    state.playersList = []
  },
  setProfile (state, profile) {
    var updateProfile = {}
    if (profile.displayName) updateProfile[`/name`] = profile.displayName
    if (profile.isNotificationsAllowed) {
      updateProfile[`/isNotificationsAllowed`] = profile.isNotificationsAllowed
    }

    return db.ref(`players/${profile.uid}/`).update(updateProfile)
  }
}

export default {
  actions,
  getters,
  mutations,
  state
}

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
  initPlayers ({ commit, getters }) {
    playersRef.orderByChild('name').on('value', function (snapshot) {
      commit('clearPlayersList')
      snapshot.forEach(snap => {
        var player = snap.val()
        player.key = snap.key
        commit('addPlayer', player)
      })
    })

    let db = firebase.database()
    if (getters.user) {
      db.ref(`players/${getters.user.uid}/`).on('value', snap => {
        commit('setProfile', snap.val())
      })
    }
  },
  savePlayer (context, player) {
    context.commit('savePlayer', player)
  },
  setProfile (context, profile) {
    console.log(profile)
    var updateProfile = {}
    if (profile.displayName) {
      updateProfile[`/name`] = profile.displayName
    }
    if (profile.isNotificationsAllowed) {
      updateProfile[`/isNotificationsAllowed`] = profile.isNotificationsAllowed
    }
    if (profile.avatarUrl) {
      updateProfile['avatarUrl'] = profile.avatarUrl
    }

    return db.ref(`players/${profile.uid}/`).update(updateProfile)
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
    state.profile = profile
  }
}

export default {
  actions,
  getters,
  mutations,
  state
}

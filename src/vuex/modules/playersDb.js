import firebase from '../../firebaseInit'

let db = firebase.database()
let playersRef = db.ref('players')

const state = {
  playersList: [],
  profile: null
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
  initPlayers ({ commit, dispatch, getters }) {
    return new Promise((resolve, reject) => {
      playersRef.orderByChild('name').on('value', function (snapshot) {
        commit('clearPlayersList')
        snapshot.forEach(snap => {
          var player = snap.val()
          player.key = snap.key
          commit('addPlayer', player)
        })
        dispatch('getProfile')
        resolve()
      })
    })
  },
  savePlayer (context, player) {
    context.commit('savePlayer', player)
  },
  getProfile ({ getters, commit }) {
    return new Promise((resolve, reject) => {
      let profile = null
      if (getters.user) {
        db.ref(`players/${getters.user.uid}/`).on('value', snap => {
          profile = snap.val()
        })
      }
      commit('setProfile', profile)
      resolve(profile)
    })
  },
  setProfile ({ getters }, profile) {
    var updateProfile = {}
    updateProfile[`/name`] = profile.displayName
    updateProfile[`/isNotificationsAllowed`] = profile.isNotificationsAllowed
    updateProfile['/avatarUrl'] = profile.avatarUrl
    return db.ref(`players/${getters.user.uid}/`).update(updateProfile)
  },
  updateIsAuthenticated ({ commit, dispatch }, user) {
    dispatch('getProfile')
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

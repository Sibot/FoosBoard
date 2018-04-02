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
  initPlayers ({ commit, dispatch, getters }) {
    console.log(getters)
    console.log(getters.user.uid)
    playersRef.orderByChild('name').on('value', function (snapshot) {
      commit('clearPlayersList')
      snapshot.forEach(snap => {
        var player = snap.val()
        player.key = snap.key
        commit('addPlayer', player)
      })
    })
    dispatch('getProfile', getters.user)
  },
  savePlayer (context, player) {
    context.commit('savePlayer', player)
  },
  getProfile ({ getters, commit }, user) {
    db.ref(`players/${user.uid}/`).on('value', snap => {
      commit('setProfile', snap.val())
    })
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
  },
  updateIsAuthenticated ({ commit, dispatch }, user) {
    if (user) {
      dispatch('getProfile', user)
      return
    }
    commit('setProfile', null)
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

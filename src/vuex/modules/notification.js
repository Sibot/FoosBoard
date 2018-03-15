const state = {
  notifications: []
}

const getters = {
  notifications (state) {
    return state.notifications
  }
}
const actions = {
  notification (context, notification) {
    console.log(notification)
    context.commit('addNotification', notification)
  }
}

const mutations = {
  addNotification (state, notification) {
    state.notifications.push(notification)
  }
}

export default {
  actions,
  getters,
  mutations,
  state
}

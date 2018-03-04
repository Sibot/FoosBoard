const state = {
  notifications: []
}

const getters = {}
const actions = {
  notification (context, notification) {
    state.notifications.push(notification)
    console.log(notification.message)
  }
}

export default {
  state,
  getters,
  actions
}

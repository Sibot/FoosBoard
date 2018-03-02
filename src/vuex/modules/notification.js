const state = {
  notifications: []
}

const getters = {}
const actions = {
  notification (context, notification) {
    this.notifications.push(notification)
    console.log(notification.message)
  }
}

export default {
  state,
  getters,
  actions
}

const state = {
  notifications: [],
  lastNotification: {}
}

const getters = {}
const actions = {
  notification (context, message) {
    console.log(message)
  }
}

export default {
  state,
  getters,
  actions
}

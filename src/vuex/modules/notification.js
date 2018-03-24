const state = {
  notifications: []
}

const getters = {
  notifications (state) {
    return state.notifications
  }
}

const actions = {
  addNotification (context, notification) {
    if (Notification.permission === 'granted') {
      notify(notification)
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(permission => {
        if (permission === 'granted') {
          notify(notification)
        }
      })
    }
    context.commit('addNotification', notification)
  }
}

const mutations = {
  addNotification (state, notification) {
    state.notifications.push(notification)
  }
}

let notify = options => {
  let notification = new Notification(options.title, options)
  console.log(options)
  setTimeout(notification.close.bind(notification), options.closeDelay || 5000)
}

export default {
  actions,
  getters,
  mutations,
  state
}

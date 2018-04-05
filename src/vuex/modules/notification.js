const state = {
  notifications: []
}

const getters = {
  notifications (state) {
    return state.notifications
  }
}

const actions = {
  addNotification (context, notificationOptions) {
    context.commit('addNotification', notificationOptions)
    if (!context.getters.profile.isNotificationsAllowed) {
      return
    }
    return new Promise((resolve, reject) => {
      if (Notification.permission === 'granted') {
        resolve(notify(notificationOptions))
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(permission => {
          if (permission === 'granted') {
            resolve(notify(notificationOptions))
          }
        })
      } else {
        reject(new Error('Permission denied'))
      }
    })
  }
}

const mutations = {
  addNotification (state, notification) {
    state.notifications.push(notification)
  }
}

let notify = options => {
  let notification = new Notification(options.title, options)
  if (options.closeDelay) {
    setTimeout(notification.close.bind(notification), options.closeDelay)
  }
  return notification
}

export default {
  actions,
  getters,
  mutations,
  state
}

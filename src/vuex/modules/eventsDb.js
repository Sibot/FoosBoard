import firebase from '../../firebaseInit'

let db = firebase.database()
let eventsRef = db.ref('events')
const maxPlayers = 4

const state = {
  ongoingEvents: []
}

const getters = {
  ongoingEvents: state => state.ongoingEvents
}

const actions = {
  initEvents ({ commit, dispatch, getters }) {
    if (!getters.isAuthenticated) return
    eventsRef.on('child_removed', snap => {
      var eventKey = snap.key
      var events = getters.ongoingEvents
      var event = events.find((v, i) => {
        return v.key === eventKey ? v : false
      })
      console.log(event)
      if (event.isOngoing && !event.isFull) {
        dispatch('addNotification', {
          title: 'Game canceled',
          body: `The game invitation by ${
            event.initiator.name
          } has been withdrawn`
        })
      }
      event.timeout.trigger()
    })

    eventsRef.on('child_added', snap => {
      var event = snap.val()
      event.key = snap.key

      var eventPlayers = eventsRef.child(`${event.key}/players`)
      var numberOfPlayers = 0
      var isThisUserAlreadyParticipating = false

      eventPlayers.on('child_added', snap => {
        if (snap.key === getters.user.uid) {
          isThisUserAlreadyParticipating = true
        }
        numberOfPlayers++
      })

      Object.defineProperty(event, 'isFull', {
        get: function () {
          return numberOfPlayers >= maxPlayers
        }
      })

      Object.defineProperty(event, 'secondsRemaining', {
        get: function () {
          var currentTimeStamp = new Date().getTime()
          var secondsRemaining =
            (new Date(this.startedAt + this.appointedTimeFrame * 60 * 1000) -
              currentTimeStamp) /
            1000
          return secondsRemaining
        }
      })

      Object.defineProperty(event, 'isOngoing', {
        get: function () {
          var currentTimeStamp = new Date().getTime()
          var eventIsOngoing =
            this.startedAt + this.appointedTimeFrame * 60 * 1000 >
            currentTimeStamp
          return eventIsOngoing
        }
      })

      if (getters.user) {
        Object.defineProperty(event, 'isThisUserAlreadyParticipating', {
          get: () => {
            return isThisUserAlreadyParticipating
          }
        })

        Object.defineProperty(event, 'isThisUserTheCreator', {
          get: () => {
            var creatorId = event.initiator.uid
            var userId = getters.user.uid
            return creatorId === userId
          }
        })
      }

      if (event.isOngoing) {
        if (
          !(
            event.isThisUserTheCreator ||
            event.isFull ||
            isThisUserAlreadyParticipating
          )
        ) {
          var newEventNotification = {
            title: 'New game invite!',
            body: `${event.initiator.name} invites you to a game of foos!
        Accept the challenge!`,
            icon: '@/assets/foos.png',
            tag: 'event'
          }
          dispatch('addNotification', newEventNotification)
        }

        // var timeoutId = setTimeout(function () {
        //   commit('hideEvent', event)
        //   eventPlayers.off()
        // }, event.secondsRemaining * 1000)

        // event.timeoutId = timeoutId

        event.timeout = createTimeout(function () {
          commit('hideEvent', event)
          eventPlayers.off()
        }, event.secondsRemaining * 1000)

        commit('addOngoingEvent', event)
      }

      Object.freeze(event)
    })
  },
  addEvent (context, event) {
    eventsRef.push(event)
  },
  cancelEvent (context, event) {
    eventsRef.child(event.key).remove()
  },
  joinEvent (context, event) {
    return new Promise((resolve, reject) => {
      var eventPlayers = eventsRef.child(`${event.key}/players`)
      var numberOfPlayers = 0
      eventPlayers.once('value', snap => {
        snap.forEach(childSnap => {
          numberOfPlayers++
        })
      })

      if (numberOfPlayers >= maxPlayers) {
        reject(new Error('Too many players!'))
      } else {
        eventPlayers
          .child(context.getters.user.uid)
          .set(context.getters.profile.name)
        resolve()
      }
    })
  }
}

const mutations = {
  addEvent (state, event) {
    state.events.push(event)
  },
  addOngoingEvent (state, event) {
    state.ongoingEvents.push(event)
  },
  hideEvent (state, event) {
    console.log(`deleting event: ${event.key}`)
    var a = state.ongoingEvents
    a.splice(a.indexOf(event), 1)
  }
}

export default {
  actions,
  getters,
  mutations,
  state
}

function createTimeout (handler, delay) {
  var timeoutId
  timeoutId = setTimeout(handler, delay)
  return {
    clear: () => {
      clearTimeout(timeoutId)
    },
    trigger: () => {
      clearTimeout(timeoutId)
      handler()
    }
  }
}

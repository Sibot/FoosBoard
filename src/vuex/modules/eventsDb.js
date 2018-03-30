import firebase from '../../firebaseInit'

let db = firebase.database()
let eventsRef = db.ref('events')

const state = {
  events: [],
  ongoingEvents: []
}

const getters = {
  events: state => state.events,
  ongoingEvents: state => state.ongoingEvents
}

const actions = {
  initEvents (context) {
    eventsRef.on('child_added', snap => {
      var event = snap.val()
      event.key = snap.key
      context.commit('addEvent', event)

      Object.defineProperty(event, 'secondsRemaining', {
        get: function () {
          return (
            (new Date(this.startedAt + this.appointedTimeFrame * 60 * 1000) -
              new Date().getTime()) /
            1000
          )
        }
      })

      Object.defineProperty(event, 'isOngoing', {
        get: function () {
          return (
            this.startedAt + this.appointedTimeFrame * 60 * 1000 >
            new Date().getTime()
          )
        }
      })
      if (event.isOngoing) {
        console.log(
          `Time remaining for ${event.key}: `,
          event.secondsRemaining * 1000
        )

        console.log(
          `Setting delete timer for ${
            event.key
          } in :  ${event.secondsRemaining * 1000} seconds.`
        )
        setTimeout(function () {
          context.commit('deleteExpiredEvent', event)
        }, event.secondsRemaining * 1000)
        context.commit('addOngoingEvent', event)
      }
    })
  },
  addEvent (context, event) {
    eventsRef.push(event)
  }
}

const mutations = {
  addEvent (state, event) {
    state.events.push(event)
  },
  addOngoingEvent (state, event) {
    state.ongoingEvents.push(event)
  },
  deleteExpiredEvent (state, event) {
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

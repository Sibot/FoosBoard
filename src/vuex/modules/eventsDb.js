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

      if (event.isOngoing) {
        var timeoutId = setTimeout(function () {
          context.commit('deleteExpiredEvent', event)
        }, event.secondsRemaining * 1000)

        event.timeoutId = timeoutId
        context.commit('addOngoingEvent', event)
      }
    })
  },
  addEvent (context, event) {
    eventsRef.push(event)
  },
  joinEvent (context, eventKey) {
    console.log(context, eventKey)
    console.log(context.rootState.getters.profile)
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

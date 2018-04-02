import firebase from '../../firebaseInit'

let db = firebase.database()
let eventsRef = db.ref('events')

const state = {
  ongoingEvents: []
}

const getters = {
  events: state => state.events,
  ongoingEvents: state => state.ongoingEvents
}

const actions = {
  initEvents (context) {
    console.log(context.getters.user.uid)
    eventsRef.on('child_added', snap => {
      var event = snap.val()
      event.key = snap.key

      var eventPlayers = eventsRef.child(`${event.key}/players`)
      var numberOfPlayers = 0
      var isThisUserAlreadyParticipating = false

      eventPlayers.on('child_added', snap => {
        console.log(snap.key, snap.val())
        if (snap.key === context.getters.user.uid) {
          isThisUserAlreadyParticipating = true
        }
        numberOfPlayers++
      })

      Object.defineProperty(event, 'isFull', {
        get: function () {
          return numberOfPlayers >= 3
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

      if (context.getters.user) {
        Object.defineProperty(event, 'isThisUserAlreadyParticipating', {
          get: () => {
            return isThisUserAlreadyParticipating
          }
        })

        Object.defineProperty(event, 'isThisUserTheCreator', {
          get: () => {
            var creatorId = event.initiator.uid
            var userId = context.getters.user.uid
            return creatorId === userId
          }
        })
      }
      if (event.isOngoing) {
        var timeoutId = setTimeout(function () {
          context.commit('hideEvent', event)
          eventPlayers.off()
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
    return new Promise((resolve, reject) => {
      var eventPlayers = eventsRef.child(`${eventKey}/players`)
      var numberOfPlayers = 0
      eventPlayers.once('value', snap => {
        snap.forEach(childSnap => {
          numberOfPlayers++
          console.log(numberOfPlayers, childSnap.key, childSnap.val())
        })
      })
      console.log(numberOfPlayers)
      if (numberOfPlayers >= 3) {
        reject(new Error('Too many players!'))
      } else {
        eventsRef
          .child(eventKey)
          .child('players')
          .child(context.getters.user.uid)
          .set(context.getters.profile.name)
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

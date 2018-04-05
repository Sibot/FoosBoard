const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// You must return a Promise when performing asynchronous tasks inside a Functions such as
// writing to the Firebase Realtime Database.

exports.segregateGameTeams = functions.database
  .ref('/games/{id}')
  .onCreate(event => {
    const game = event.data.val()
    var gameId = event.params.id

    return new Promise((resolve, reject) => {
      game.teams.forEach(team => {
        team.players.forEach(player => {
          admin
            .database()
            .ref('/teamSetup')
            .push({
              gameId: gameId,
              playedAt: game.playedAt,
              playerId: player.key,
              team: team.id,
              score: team.score,
              isWinner: team.isWinner
            })
        })
      })
      resolve()
    })
  })

exports.calculatePlayerWins = functions.database
  .ref('/teamSetup/{id}')
  .onWrite(event => {
    // Grab the current value of what was written to the Realtime Database.
    const teamSetup = event.data.val()

    var currentPlayer = {
      totalPlayed: 0,
      totalWon: 0
    }

    return new Promise((resolve, reject) => {
      admin
        .database()
        .ref('/teamSetup/')
        .orderByChild('playerId')
        .equalTo(teamSetup.playerId)
        .once('value', games => {
          games.forEach(gameSnap => {
            var game = gameSnap.val()
            currentPlayer.totalPlayed += 1
            if (game.isWinner) {
              currentPlayer.totalWon += 1
            }
          })
          resolve()
        })
    }).then(() => {
      var update = {}

      update['/players/' + teamSetup.playerId + '/totalPlayed'] =
        currentPlayer.totalPlayed

      update['/players/' + teamSetup.playerId + '/totalWon'] =
        currentPlayer.totalWon

      return admin
        .database()
        .ref()
        .update(update)
    })
  })

exports.clearOldEvents = functions.database.ref('/events').onCreate(() => {
  var pastEventKeys = []

  console.info('Commencing purge of events')
  admin
    .database()
    .ref('/events')
    .once('value', eventsSnap => {
      eventsSnap.forEach(eventSnap => {
        var event = eventSnap.val()
        eventTime = event.startedAt + event.appointedTimeFrame * 60 * 1000
        console.info(new Date(eventTime).toJSON())
        if (new Date().getTime() > eventTime) {
          console.info(
            `Event with key '${eventSnap.key}' is old, marked for removal.`
          )
          pastEventKeys.push(eventSnap.key)
        }
      })
    })

  console.log(`Purging ${pastEventKeys.length} events.`)

  return new Promise((resolve, reject) => {
    pastEventKeys.forEach(eventKey => {
      console.info(`Event with key '${eventKey}' is being deleted.`)
      admin
        .database()
        .ref(`/events/${eventKey}`)
        .remove()
    })
    resolve()
  })
})

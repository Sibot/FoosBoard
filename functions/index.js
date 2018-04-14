const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()
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
  .onCreate((snap, context) => {
    const game = snap.val()
    var gameId = context.params.id

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
  .onWrite((change, context) => {
    const teamSetup = change.after.val()

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

// exports.clearOldEvents = functions.database
//   .ref('/events')
//   .onCreate((snap, context) => {
//     var pastEventKeys = {}

//     console.log('Commencing purge of events')

//     admin
//       .database()
//       .ref('events')
//       .once('child_added', eventsSnap => {
//         var event = eventSnap.val()
//         eventTime = event.startedAt + event.appointedTimeFrame * 60 * 1000
//         console.log('This event Expires: ', new Date(eventTime).toJSON())
//         console.log('Time is now: ', new Date().toJSON())

//         if (new Date().getTime() > eventTime) {
//           console.log(
//             'Event expired ' +
//               new Date(eventTime).toJSON() +
//               ',' +
//               eventKey +
//               ' marked for removal.'
//           )
//           pastEventKeys[`/events/${eventKey}`] = null
//         }
//       })

//     console.log(`Purging ${pastEventKeys.length} events.`)

//     return admin.database().update(pastEventKeys)
//   })

const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.calculatePlayerWins = functions.database
  .ref('/teamSetup/{id}')
  .onWrite(event => {
    // Grab the current value of what was written to the Realtime Database.
    const original = event.data.val()
    console.info('the original', original)
    console.info('Calculating wins for player: ', original.playerId)
    var currentPlayer = {
      totalPlayed: 0,
      totalWon: 0
    }

    let winsPromise = new Promise((resolve, reject) => {
      admin
        .database()
        .ref('/teamSetup/')
        .orderByChild('playerId')
        .equalTo(original.playerId)
        .once('value', games => {
          console.info('counting games')
          games.forEach(gameSnap => {
            var game = gameSnap.val()
            currentPlayer.totalPlayed += 1
            console.info('counting game: ', game.key, currentPlayer.totalPlayed)
            if (game.isWinner) {
              currentPlayer.totalWon += 1
              console.info('count winner of game!!!!!!', currentPlayer.totalWon)
            }
          })
          resolve()
        })
    })

    return Promise.all([winsPromise]).then(() => {
      var update = {}
      update['/players/' + original.playerId + '/totalPlayed'] =
        currentPlayer.totalPlayed
      update['/players/' + original.playerId + '/totalWon'] =
        currentPlayer.totalWon

      console.info('Updating player ', currentPlayer)

      return admin
        .database()
        .ref()
        .update(update)
    })
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
  })

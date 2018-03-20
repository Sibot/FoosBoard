const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.segregateGameTeams = functions.database
  .ref('/games/{id}')
  .onCreate(event => {
    const game = event.data.val()
    var gameId = event.params.id

    console.info('parsing game:', game, gameId)

    return new Promise((resolve, reject) => {
      game.teams.forEach((team, i, a) => {
        console.info('parsing team: ', team)
        team.players.forEach((player, i, a) => {
          console.info('parsing player: ', player)
          admin
            .database()
            .ref('/teamSetup')
            .push({
              gameId: gameId,
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

    console.info('the original', teamSetup)
    console.info('Calculating wins for player: ', teamSetup.playerId)

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
          console.info('counting games')
          games.forEach(gameSnap => {
            var game = gameSnap.val()
            currentPlayer.totalPlayed += 1
            console.info(
              'counting game: ',
              gameSnap.key,
              currentPlayer.totalPlayed
            )
            if (game.isWinner) {
              currentPlayer.totalWon += 1
              console.info('count winner of game:', currentPlayer.totalWon)
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

      console.info('Updating player ', currentPlayer)

      return admin
        .database()
        .ref()
        .update(update)
    })
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
  })

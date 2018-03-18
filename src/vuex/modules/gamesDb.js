import firebase from '../../firebaseInit'

let db = firebase.database()
let gamesDb = db.ref('games/')
let teamSetupDb = db.ref('teamSetup/')
let playersDb = db.ref('players/')

const state = {
  gamesList: [],
  topTenLatestGames: []
}

const getters = {
  gamesList: state => {
    return state.gamesList
  },
  topTenLatestGames: state => {
    return state.topTenLatestGames
  }
}

const mutations = {
  addGame (state, game) {
    state.gamesList.push(game)
  },
  addTopTenLatestGames (state, game) {
    state.topTenLatestGames.push(game)
  },
  saveGame (state, game) {
    let newGameRef = gamesDb.push({ playedAt: game.playedAt })
    game.teams.forEach((team, i, a) => {
      team.players.forEach((player, i, a) => {
        teamSetupDb.push({
          gameId: newGameRef.key,
          playerId: player.key,
          team: team.id,
          score: team.score,
          isWinner: team.isWinner
        })
      })
    })
  },
  clearGamesList (state) {
    state.gamesList = []
  },
  clearTopTenLatestGames (state) {
    state.topTenLatestGames = []
  }
}

const actions = {
  initGames (context) {
    gamesDb.once('value', snap => {
      snap.forEach(snap => {
        var game = snap.val()
        game.key = snap.key
        context.commit('addGame', game)
      })
    })
    gamesDb
      .orderByChild('playedAt')
      .limitToFirst(10)
      .on('value', gameSnap => {
        context.commit('clearTopTenLatestGames')
        gameSnap.forEach(gameChild => {
          var game = gameChild.val()
          game.key = gameChild.key
          game.teams = []
          function Team () {
            return {
              id: 0,
              score: 0,
              players: [],
              isWinner: false
            }
          }
          var currentTeam = new Team()
          teamSetupDb
            .orderByChild('gameId')
            .equalTo(gameChild.key)
            .once('value', snap => {
              snap.forEach(memberSnap => {
                var teamMember = memberSnap.val()
                if (currentTeam.id !== teamMember.team) {
                  currentTeam = new Team()
                  currentTeam.id = teamMember.team
                  currentTeam.score = teamMember.score
                  currentTeam.isWinner = teamMember.isWinner
                } else {
                  game.teams.push(currentTeam)
                }
                playersDb
                  .orderByKey()
                  .equalTo(teamMember.playerId)
                  .once('value', playersSnap => {
                    playersSnap.forEach(playerSnap => {
                      currentTeam.players.push({
                        key: playerSnap.key,
                        name: playerSnap.val()
                      })
                    })
                  })
              })
            })
          context.commit('addTopTenLatestGames', game)
        })
      })
    gamesDb.on('child_added', snap => {
      var game = snap.val()
      game.key = snap.key
      context.commit('addGame', game)
    })
  },
  saveGame (context, game) {
    context.commit('saveGame', game)
  }
}

export default {
  actions,
  getters,
  mutations,
  state
}

<template>
  <div>
    <md-card>
      <md-card-header>
        <h2 class="md-title">Register a game</h2>
        <h4 class="md-subtitle">Enter players</h4>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label for="playerName"></label>
          <md-input type="text" name="playerName" v-model="playerName"></md-input>
        </md-field>
        <md-card-actions>
          <md-button class="md-rasied md-primary" v-on:click="addPlayer()">Add player</md-button>
        </md-card-actions>
      </md-card-content>
    </md-card>
    <md-card v-if="players.length">
      <md-card-header>
        <h4 class="md-subtitle">Assign players to a team</h4>
      </md-card-header>
      <md-card-content>
        <ul>
          <li v-for="player in players" :key="player.id">
            <div class="player">
              {{player.name}}
            </div>
            <md-button class="md-raised"
              v-for="team in teams" :key="team.id"
              v-on:click="addTeamMember(team, player)">
                Assign to team {{team.id}}
            </md-button>
          </li>
        </ul>
      </md-card-content>
    </md-card>
    <md-card>
      <md-card-content class="md-layout md-gutter">
        <div v-for="team in teams" :key="team.id" class="md-layout-item">
          <md-card v-if="team.players.length">
            <md-card-header>
              <h4 class="md-title">Team {{team.id}}</h4>
            </md-card-header>
            <md-card-content>
              <md-radio name="isWinner" :value="true" v-model="team.isWinner"></md-radio>
              <div v-for="player in team.players" :key="player.id">
                {{player.name}}
              </div>
                <md-field>
                  <label>Score</label>
                  <md-input v-model="team.score" type="number"></md-input>
              </md-field>
            </md-card-content>
          </md-card>
        </div>
      </md-card-content>
    </md-card>
    <md-card>
      <md-content>
        <md-datepicker v-model="selectedDate"></md-datepicker>
      </md-content>
      <md-card-actions>
        <md-button class="md-raised md-primary">Save game</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'RegisterGame',
  data () {
    return {
      id: 0,
      game: { teams: this.teams },
      players: [],
      teams: [],
      playerName: '',
      selectedDate: new Date()
    }
  },
  created () {
    this.teams.push({ id: 1, score: 0, players: [], isWinner: false }, { id: 2, score: 0, players: [], isWinner: false })
  },
  methods: {
    addPlayer: function () {
      this.players.push({ id: this.newId(), name: this.playerName })
      this.playerName = ''
    },
    addTeamMember: function (team, player) {
      team.players.push(player)
      this.players.splice(this.players.indexOf(player), 1)
    },
    saveGame: function (game) {
      game.playedAt = this.selectedDate
      this.$store.commit('recordGame', game)
    },
    newId: function () {
      this.id += 1
      return this.id
    },
    validateGame: function () {
      if (this.game.teams.length !== 2) {
        return false
      }
      let teamsWithOneorTwoPlayers = this.game.teams.filter(element => {
        return element.players.length > 0 || element.players.length < 3
      })
      if (teamsWithOneorTwoPlayers.length !== 2) {
        return false
      }
      if (this.game.playedAt > new Date()) {
        return false
      }

      return true
    }
  }
}
</script>
<style>
.md-layout-item {
  min-width: 50%;
}
</style>

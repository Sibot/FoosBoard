<template>
  <div>
    <md-card>
      <md-card-header>
        <h2 class="md-title">Register a game</h2>
        <h4 class="md-subheading">Enter players</h4>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label for="playerName"></label>
          <md-input type="text" name="playerName" v-model="playerName"></md-input>
        </md-field>
        <md-card-actions>
          <md-button class="md-raised md-primary" v-on:click="addPlayer()">Add player</md-button>
        </md-card-actions>
      </md-card-content>
    </md-card>
    <md-card v-if="players.length">
        <md-card-header>
        <h4 class="md-subheading">Assign players to a team</h4>
      </md-card-header>
      <md-card-content>
        <ul>
          <li v-for="player in players" :key="player.id">
            <div class="player">
              {{player.name}}
            </div>
            <md-button class="md-raised"
              v-for="team in teams" :key="team.id"
              @click="addTeamMember(team, player)">
                Assign to team {{team.id}}
            </md-button>
          </li>
        </ul>
      </md-card-content>
    </md-card>
    <md-card v-if="teamsPopulated">
      <md-card-header>
        <h4 class="md-subheading">Enter score</h4>
      </md-card-header>
      <md-card-content class="md-layout md-gutter">
        <div v-for="team in teams" :key="team.id" class="md-layout-item">
          <md-card v-if="team.players.length">
            <md-card-header>
              <h4 class="md-subheading">Team {{team.id}}</h4>
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
    <md-card v-if="teamScored">
      <md-card-header>
        <h4 class="md-subheading">Enter time of play</h4>
      </md-card-header>
      <md-card-content>
        <md-datepicker v-model="selectedDate" :md-disabled-dates="disabledDates"></md-datepicker>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-raised md-primary" @click="saveGame()" :disabled="isInvalidGame">Save game</md-button>
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
      players: [],
      teams: [],
      playerName: '',
      selectedDate: new Date(),
      disabledDates: function (date) {
        return date > new Date()
      }
    }
  },
  created () {
    this.$material.locale.firstDayOfAWeek = 1
    this.teams.push(
      { id: 1, score: 0, players: [], isWinner: false },
      { id: 2, score: 0, players: [], isWinner: false }
    )
  },
  computed: {
    isInvalidGame: function () {
      if (this.teams.length !== 2) {
        return true
      }
      if (this.teamsPopulated !== 2) {
        return true
      }
      if (this.selectedDate > new Date()) {
        return true
      }
      if (!this.teamScored) {
        return true
      }

      return false
    },
    game: function () {
      return { playedAt: this.selectedDate, teams: this.teams }
    },
    teamsPopulated: function () {
      let teamsWithOneOrTwoPlayers = this.teams.filter(element => {
        return element.players.length === 1 || element.players.length === 2
      })
      return teamsWithOneOrTwoPlayers.length
    },
    teamScored: function () {
      let teamsWithScore = this.teams.filter(element => {
        return parseInt(element.score, 10) > 0
      })
      return teamsWithScore.length > 0
    }
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
    newId: function () {
      this.id += 1
      return this.id
    },
    saveGame: function () {
      this.$store.dispatch('saveGame', this.game)
    }
  }
}
</script>
<style>
.md-layout.md-gutter {
  margin-left: 0;
  margin-right: 0;
}
</style>

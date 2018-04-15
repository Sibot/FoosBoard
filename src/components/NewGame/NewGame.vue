<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-flex d-flex xs12>
        <v-stepper v-model="step">
        <h1 class="headline text-xs-center">Register a game</h1>
          <v-stepper-header>
            <v-stepper-step step="1" :complete="step > 1">Add Players</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2" :complete="step > 2">Assign Teams</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3" :complete="step > 3">Enter results</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="4">Enter date</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <add-player
                :players="players"
                :step.sync="step" ></add-player>
            </v-stepper-content>
            <v-stepper-content step="2">
              <assign-teams
                :players="players"
                :teams="teams"
                :step.sync="step"></assign-teams>
            </v-stepper-content>
            <v-stepper-content step="3">
              <team-score
                :teams="teams"
                :step.sync="step"></team-score>
            </v-stepper-content>
            <v-stepper-content step="4">
              <game-time
                :selectedDate.sync="selectedDate"
                :saveFn="saveGame"
                :disabledSaveFn="isInvalidGame"></game-time>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        </v-flex>
     </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import AddPlayer from './AddPlayer'
import AssignTeams from './AssignTeams'
import TeamScore from './TeamScore'
import GameTime from './GameTime'

export default {
  name: 'NewGame',
  components: {
    'add-player': AddPlayer,
    'assign-teams': AssignTeams,
    'game-time': GameTime,
    'team-score': TeamScore
  },
  data () {
    return {
      step: 0,
      players: [],
      teams: [],
      selectedDate: null
    }
  },
  created () {
    this.init()
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
    init: function () {
      this.teams = [
        { id: 1, score: 0, players: [], isWinner: false },
        { id: 2, score: 0, players: [], isWinner: false }
      ]
      this.players = []
      this.selectedDate = this.getDate()
      this.step = 1
    },
    saveGame: function () {
      this.$store.dispatch('saveGame', this.game)
      this.init()
    },
    getDate () {
      const toTwoDigits = num => num < 10 ? '0' + num : num
      let today = new Date()
      return `${today.getFullYear()}-${toTwoDigits(today.getMonth() + 1)}-${toTwoDigits(today.getDate())}`
    }
  }
}
</script>

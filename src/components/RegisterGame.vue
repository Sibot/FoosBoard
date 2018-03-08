<template>
  <div>
    <add-player :players=players ></add-player>
    <assign-teams v-if="players.length" :players="players" :teams="teams"></assign-teams>
    <team-score v-if="teamsPopulated" :teams="teams"></team-score>
    <game-time v-if="teamScored" :selectedDate="selectedDate" :disabledDatesFn="disabledDates" :saveFn="saveGame" :disabledSaveFn="isInvalidGame"></game-time>
  </div>
</template>

<script>
import AddPlayer from './RegisterGame/AddPlayer'
import AssignTeams from './RegisterGame/AssignTeams'
import TeamScore from './RegisterGame/TeamScore'
import GameTime from './RegisterGame/GameTime'

export default {
  name: 'RegisterGame',
  components: {
    'add-player': AddPlayer,
    'assign-teams': AssignTeams,
    'game-time': GameTime,
    'team-score': TeamScore
  },
  data () {
    return {
      players: [],
      teams: [],
      selectedDate: new Date(),
      disabledDates: function (date) {
        return date > new Date()
      }
    }
  },
  created () {
    this.$material.locale.firstDayOfAWeek = 1
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
    },
    saveGame: function () {
      this.$store.dispatch('saveGame', this.game)
      console.log(this.game)
      this.init()
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

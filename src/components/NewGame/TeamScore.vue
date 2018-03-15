<template>
  <v-card width="90%">
    <v-card-title>
      Enter results
    </v-card-title>
    <v-card-text>
      <v-card class="mt-2 mr-2"
        v-for="team in teams"
        :key="team.id"
        :class="{'winning-team': team.isWinner, 'losing-team': !team.isWinner}"
        :raised="team.isWinner">
        <v-card-title>
          <v-toolbar color="primary">
            <v-toolbar-title class="white--text">Team {{team.id}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon @click="setWinner(team)">
                <v-icon>{{team.isWinner ? 'star' : 'star_border'}}</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <!-- <v-radio name="isWinner" :value="true" v-model="team.isWinner"></v-radio> -->
        </v-card-title>
        <v-card-text>
          <div v-for="player in team.players" :key="player.id">
            {{player.name}}
          </div>
          <v-layout row wrap>
            <v-flex xs9>
              <v-slider @input="calcWinner" label="Team score" :max="8" v-model="team.score"></v-slider>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                name="input-1"
                id="teamScore"
                v-model="team.score"
                type="number"
                @input="calcWinner">
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click.native="updateStep">Continue</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'TeamScore',
  props: ['teams', 'step'],
  methods: {
    updateStep: function () {
      this.$emit('update:step', 4)
    },
    setWinner: function (team) {
      this.teams.forEach(team => {
        team.isWinner = false
      })
      team.isWinner = true
    },
    calcWinner: function () {
      let winningTeam = this.teams.reduce(function (prevTeam, nextTeam) {
        if (prevTeam.score > nextTeam.score) {
          return prevTeam
        }
        return nextTeam
      })
      this.setWinner(winningTeam)
    }
  }
}
</script>
<style scoped>
.winning-team {
  background-color: #e6f5da;
}
.losing-team {
  background-color: #f5dadb;
}
</style>


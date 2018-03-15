<template>
  <v-card>
    <v-card-title primary-title>
      <div class="headline">
        Assign players to a team
      </div>
    </v-card-title>
    <ul>
      <li v-for="player in players" :key="player.id">
        <div class="player">
          {{player.name}}
        </div>
        <v-btn
          v-for="team in teams" :key="team.id"
          @click="addTeamMember(team, player)">
            Assign to team {{team.id}}
        </v-btn>
      </li>
    </ul>
    <div v-for="team in teams" :key="team.id" >
      <div v-if="team.players.length">
        <h5>Team {{team.id}}</h5>
        <ul>
          <li v-for="player in team.players" :key="player.key">
            {{player.name}}
          </li>
        </ul>
      </div>
    </div>
    <v-btn color="primary" @click.native="updateStep">Continue</v-btn>
  </v-card>
</template>
<script>
export default {
  name: 'AssignTeams',
  props: ['players', 'teams'],
  methods: {
    addTeamMember: function (team, player) {
      team.players.push(player)
      this.players.splice(this.players.indexOf(player), 1)
    },
    updateStep: function () {
      this.$emit('update:step', 3)
    }
  }
}
</script>

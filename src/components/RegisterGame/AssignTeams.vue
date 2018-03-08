<template>
      <md-card>
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
</template>
<script>
export default {
  name: 'AssignTeams',
  props: ['players', 'teams'],
  methods: {
    addTeamMember: function (team, player) {
      team.players.push(player)
      this.players.splice(this.players.indexOf(player), 1)
    }
  }
}
</script>

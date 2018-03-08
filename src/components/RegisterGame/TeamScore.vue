<template>
  <md-card>
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
</template>
<script>
export default {
  name: 'TeamScore',
  props: ['teams']
}
</script>

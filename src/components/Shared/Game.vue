<template>
  <v-card>
    <v-card-title>
      {{game.playedAt}}
    </v-card-title>
    <v-card-text>
      <v-list two-line>
        <template v-for="team in sortByScore(game.teams)">
          <v-list-tile :key="team.id">
            <v-list-tile-content>
              <v-list-tile-title >
                <span>Players:
                  <span v-for="player in team.players" :key="player.id">{{player.name}} </span>
                </span>
              </v-list-tile-title>
              <v-list-tile-sub-title>
                <span>Score: {{team.score}}</span>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Game',
  props: ['game'],
  methods: {
    sortByScore: function (teams) {
      return teams.map(t => t).sort(function (current, next) {
        return next.score - current.score
      })
    }
  }
}
</script>


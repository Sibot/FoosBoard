<template>
  <v-container fluid grid-list-md>
    <v-card>
      <v-card-title>Last games played:</v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex v-for="game in gamesList" :key="game.key">
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
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>

</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GamesList',
  data () {
    return {}
  },
  props: ['take'],
  methods: {
    sortByScore: function (teams) {
      return teams.map(t => t).sort(function (current, next) {
        if (current.score < next.score) {
          return 1
        }
        if (current.score > next.score) {
          return -1
        }
        return 0
      })
    }
  },
  computed: {
    ...mapGetters(['gamesList'])
  }
}
</script>

<template>
  <v-flex>
    <v-container fluid grid-list-md>
      <v-card>
        <v-card-title>
          <v-subheader class="headline">Games played:</v-subheader>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex v-for="game in gamesList" :key="game.key">
              <app-game :game="game">
              </app-game>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-container>
  </v-flex>
</template>
<script>
import { mapGetters } from 'vuex'
import Game from './Shared/Game'
export default {
  name: 'History',
  components: {
    'app-game': Game
  },
  computed: {
    ...mapGetters['gamesList']
  }
}
</script>

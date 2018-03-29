<template>
  <v-container fluid grid-list-md>
    <v-card>
      <v-card-title>
        <v-subheader class="headline">10 Last games played:</v-subheader></v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex v-for="game in topTenLatestGames" :key="game.key">
            <app-game :game="game">
            </app-game>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import Game from '../Shared/Game'

export default {
  name: 'GamesList',
  components: {
    'app-game': Game
  },
  data () {
    return {}
  },
  props: { 'take': Number },
  computed: {
    ...mapGetters(['topTenLatestGames'])
  }
}
</script>

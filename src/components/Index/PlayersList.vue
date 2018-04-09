<template>
  <v-container fluid grid-list-md>
  <v-card>
    <v-card-title>
      <v-subheader class="headline">{{playersList.length || 'No'}} Players</v-subheader>
    </v-card-title>
    <v-card-text>
      <v-list two-line v-if="playersList.length">
        <template v-for="player in playersList">
          <v-list-tile avatar :key="player.key">
            <v-list-tile-avatar>
              <img :src="player.avatarUrl || `https://picsum.photos/40/40/?${randomInt()}`" alt="Random person">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{player.name || 'unknown'}}</v-list-tile-title>
              <v-list-tile-sub-title>
                Played: {{player.totalPlayed || 0}}
              </v-list-tile-sub-title>
              <v-list-tile-sub-title>
                Won: {{player.totalWon || 0}}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['playersList'])
  },
  methods: {
    randomInt () {
      // Todo implement uuid seeded number generator
      var hash = 0
      var i, chr
      if (this.length === 0) return hash
      for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i)
        hash = ((hash << 5) - hash) + chr
        hash |= 0
      }
      return Math.floor(Math.random(1000) * 1000)
    }
  }
}
</script>

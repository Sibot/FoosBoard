<template>
  <v-container fluid grid-list-md>
  <v-card>
    <v-card-title>
      <v-subheader class="headline">Players</v-subheader>
    </v-card-title>
    <v-card-text>
      <v-list two-line>
        <template v-for="player in playersList">
          <v-list-tile avatar :key="player.key">
            <v-list-tile-avatar>
              <img :src="player.avatarUrl ? player.avatarUrl : 'https://placeimg.com/100/100/people'" alt="Random person">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{player.name}}</v-list-tile-title>
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
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['playersList'])
  }
}
</script>

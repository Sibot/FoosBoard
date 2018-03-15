<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <v-subheader class="headline">Players</v-subheader>
          <template v-for="player in playersList">
            <v-list-tile avatar :key="player.key">
              <v-list-tile-avatar>
                <img src="https://placeimg.com/100/100/people" alt="Random person">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{player.name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
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

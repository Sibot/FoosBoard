<template>
  <v-layout>
    <v-flex>
      <players-list></players-list>
    </v-flex>
    <v-flex>
      <app-list :list="topTenLatestGames" :take=9>
        <v-subheader slot="header" class="headline">{{topTenLatestGames.length ? `${topTenLatestGames.length} latest` : 'No'}} games played</v-subheader>
        <app-game slot="flexItem"></app-game>
      </app-list>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Game from '../Shared/Game'
import PlayersList from './PlayersList'
import AppList from '../Shared/AppList'

export default {
  name: 'Index',
  components: {
    'app-game': Game,
    'players-list': PlayersList,
    'app-list': AppList
  },
  computed: {
    ...mapGetters(['topTenLatestGames'])
  }
}
</script>

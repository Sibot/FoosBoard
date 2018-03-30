<template>
  <v-layout>
    <!-- <v-flex>
      <events-list>
      </events-list>
    </v-flex> -->
    <v-flex>
      <players-list></players-list>
    </v-flex>
    <v-flex>
      <games-list :take=5></games-list>
    </v-flex>
  </v-layout>
</template>

<script>
import Events from '../Events'
import PlayersList from './PlayersList'
import GamesList from './GamesList'

export default {
  name: 'Index',
  components: {
    'events-list': Events,
    'players-list': PlayersList,
    'games-list': GamesList
  }
}
</script>

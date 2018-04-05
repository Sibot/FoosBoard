<template>
  <v-layout>
    <v-flex>
      <players-list></players-list>
    </v-flex>
    <v-flex>
      <games-list :take=5></games-list>
    </v-flex>
  </v-layout>
</template>

<script>
import PlayersList from './PlayersList'
import GamesList from './GamesList'

export default {
  name: 'Index',
  components: {
    'players-list': PlayersList,
    'games-list': GamesList
  }
}
</script>

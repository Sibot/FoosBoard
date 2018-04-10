<template>
  <v-flex>
    <v-container fluid grid-list-md>
      <v-card>
        <v-card-title>
          <slot name="header"></slot>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex v-for="(item, index) in list" :key="index">
              <app-game :listItem="item">
              </app-game>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-container>
  </v-flex>
</template>
<script>
import Game from '../Shared/Game'
export default {
  name: 'AppList',
  components: {
    'app-game': Game
  },
  props: { 'take': Number, 'list': Array }
}
</script>

<template>
  <v-card>
    <v-card-title primary-title>
      <div class="headline">
        Enter players
      </div>
    </v-card-title>
    <v-select
      chips
      tags
      solo
      clearable
      :items="playersList"
      item-text="name"
      v-model="selectedPlayers"
      label="Player name"
      autocomplete
    >
      <template slot="selection" slot-scope="data">
        <v-chip
          close
          @input="remove(data.item)"
          :selected="data.selected"
        >
          <strong>{{ data.item.name }}</strong>
        </v-chip>
      </template>
    </v-select>
    <v-card-actions>
      <v-btn v-on:click="addPlayer()">Add player</v-btn>
      <v-btn color="primary" @click.native="updateStep" :disabled="players.length < 2">Continue</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AddPlayer',
  props: ['players'],
  computed: {
    ...mapGetters(['playersList'])
  },
  data () {
    return {
      id: 0,
      selectedPlayers: [],
      playerName: ''
    }
  },
  methods: {
    ...mapActions(['savePlayer']),
    addPlayer: function () {
      this.players.push(...this.selectedPlayers)
      this.playerName = ''
    },
    newId: function () {
      this.id += 1
      return this.id
    },
    remove (item) {
      this.players.splice(this.players.indexOf(item), 1)
      this.players = [...this.players]
    },
    saveAddPlayer: function () {
      this.savePlayer({ name: this.playerName })
      this.addPlayer()
    },
    updateStep: function () {
      this.$emit('update:step', 2)
    }
  }
}
</script>

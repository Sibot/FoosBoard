<template>
    <md-card>
      <md-card-header>
        <h2 class="md-title">Register a game</h2>
        <h4 class="md-subheading">Enter players</h4>
      </md-card-header>
      <md-card-content>
        <md-field>
          <md-autocomplete name="player" v-model="playerName" :md-options="playersList">
            <label>Players</label>
          </md-autocomplete>
        </md-field>
        <md-card-actions>
          <md-button class="md-raised md-primary" v-on:click="addPlayer()">Add player</md-button>
          <md-button class="md-raised" v-on:click="saveAddPlayer()">Save and Add player</md-button>
        </md-card-actions>
      </md-card-content>
    </md-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AddPlayer',
  props: ['players'],
  computed: {
    ...mapGetters(['playersList', 'playersDb'])
  },
  data () {
    return {
      id: 0,
      playerName: ''
    }
  },
  methods: {
    ...mapActions(['savePlayer']),
    addPlayer: function () {
      this.players.push({ id: this.newId(), name: this.playerName })
      this.playerName = ''
    },
    newId: function () {
      this.id += 1
      return this.id
    },
    saveAddPlayer: function () {
      this.savePlayer(this.playerName)
      this.addPlayer()
    }
  }
}
</script>

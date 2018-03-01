<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="playerName" />
    <button v-on:click="addPlayer()">Add player</button>
    <div>
      <ul>
        <li v-for="player in players" :key="player.id">
          <div class="player">
            {{player.id}}-{{player.name}}
            <button class="button"
              v-for="team in teams" :key="team.id"
              v-on:click="addTeamMember(team, player)">
                Add to Team {{team.id}}
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <div v-for="team in teams" :key="team.id">
        <div v-if="team.players.length">
          <h4>Team {{team.id}}</h4>
          <input type="radio" name="isWinner" :model="team.isWinner" :checked="team.isWinner" :value-when-true="true">
          <div v-for="player in team.players" :key="player.id">
            {{player.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Game',
  data () {
    return {
      id: 0,
      game: {teams: this.teams},
      players: [],
      teams: [],
      playerName: '',
      msg: 'Record a new game',
      checked: ''
    }
  },
  created () {
    this.teams.push({id: 1, players: [], isWinner: false}, {id: 2, players: [], isWinner: false})
  },
  methods: {
    addPlayer: function () {
      this.players.push({ id: this.newId(), name: this.playerName })
    },
    addTeamMember: function (team, player) {
      team.players.push(player)
    },
    saveGame: function (game) {
      game.playedAt = new Date()
    },
    newId: function () {
      this.id += 1
      return this.id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

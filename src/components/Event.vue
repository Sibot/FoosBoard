<template>
    <v-card>
      <v-card-text>
        <v-list two-line>
          <v-list-tile-content>
            <v-list-tile-title>{{event.initiatorName}} invites to a game</v-list-tile-title>
            <v-list-tile-sub-title>
              In: {{secondsRemaining | secondsOrMinutes}}
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action class="text-xs-center">
            <v-btn @click="joinEvent" dark small color="primary">
              Join
            </v-btn>
          </v-list-tile-action>
        </v-list>
      </v-card-text>
    </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  filters: {
    secondsOrMinutes: function (seconds) {
      var time = 0
      var unit = 'time'
      time = Math.ceil(seconds > 60 ? seconds / 60 : seconds)
      unit = seconds > 60 ? 'minutes' : 'seconds'
      return `${time} ${unit}`
    }
  },
  created: function () {
    this.updateTime()
    this.intervalId = setInterval(this.updateTime, 1000)
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  data () {
    return {
      secondsRemaining: 0,
      intervalId: null
    }
  },
  destroyed: function () {
    clearInterval(this.intervalId)
  },
  methods: {
    joinEvent () {
      this.$store.dispatch('joinEvent', this.event.key)
    },
    updateTime () {
      this.secondsRemaining = this.event.secondsRemaining
    }
  },
  props: ['event']
}
</script>

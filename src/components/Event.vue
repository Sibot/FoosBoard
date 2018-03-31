<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-list two-line>
          <v-list-tile-content>
            <v-list-tile-title>{{event.initiatorName}} invites to a game</v-list-tile-title>
            <v-list-tile-sub-title>
              In: {{secondsRemaining | secondsOrMinutes}}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
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
    updateTime () {
      this.secondsRemaining = this.event.secondsRemaining
    }
  },
  props: ['event']
}
</script>

<template>
    <v-card>
      <v-card-text>
        <v-list two-line>
          <v-list-tile-content>
            <v-list-tile-title>
              {{event.initiator.name}} invites to a game
            </v-list-tile-title>
            <v-list-tile-sub-title>
              In: {{secondsRemaining | secondsOrMinutes}}
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action class="text-xs-center">
            <v-btn
              v-if="event.isThisUserTheCreator"
              @click="cancelEvent"
              small
              color="warning">cancel</v-btn>
            <v-btn
              v-if="!this.event.isThisUserAlreadyParticipating
                && !this.event.isThisUserTheCreator
                && !this.event.isFull"
              @click="joinEvent"
              small
              color="primary">
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
    this.updateEvent()
    this.intervalId = setInterval(this.updateEvent, 3000)
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user'])
  },
  data () {
    return {
      secondsRemaining: 0,
      isFull: false,
      intervalId: null,
      isAllowedToJoin: false,
      isThisEventFull: false
    }
  },
  destroyed: function () {
    clearInterval(this.intervalId)
  },
  methods: {
    cancelEvent () {
      event.cancel = true
    },
    joinEvent () {
      this.$store.dispatch('joinEvent', this.event.key)
    },
    updateEvent () {
      this.secondsRemaining = this.event.secondsRemaining
    }
  },
  props: ['event']
}
</script>

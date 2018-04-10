<template>
    <v-card>
      <v-card-text>
        <v-list two-line>
          <v-list-tile-content>
            <v-list-tile-title>
              <span v-if="!isThisEventFull">
                {{event.isThisUserTheCreator ? 'You invited' : `${event.initiator.name} invites`}}  to a game
              </span>
              <span v-else>Game is on!</span>
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
              v-if="isAllowedToJoin"
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
    this.intervalId = setInterval(this.updateEvent, 1000)
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user']),
    isAllowedToJoin () {
      return this.event &&
        this.isAuthenticated &&
        !this.isJoined &&
        !this.event.isThisUserAlreadyParticipating &&
        !this.event.isThisUserTheCreator &&
        !this.isThisEventFull
    }
  },
  data () {
    return {
      secondsRemaining: 0,
      isJoined: false,
      intervalId: null,
      isThisEventFull: false
    }
  },
  destroyed: function () {
    clearInterval(this.intervalId)
  },
  methods: {
    cancelEvent () {
      this.$store.dispatch('cancelEvent', this.event)
    },
    joinEvent () {
      this.isJoined = true
      this.$store.dispatch('joinEvent', this.event).catch((error) => {
        this.$store.dispatch('addNotification', { title: 'I`m sorry ', body: error.message, tag: 'error' })
      })
    },
    updateEvent () {
      this.secondsRemaining = this.event.secondsRemaining
      this.isThisEventFull = this.event.isFull
    }
  },
  props: ['event']
}
</script>

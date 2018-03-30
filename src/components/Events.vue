<template>
  <div>
    <v-btn @click="addNewEvent">Add Event</v-btn>
    <div v-for="event in ongoingEvents" :key="event.key">
      {{event.startedAt}} - {{event.appointedTimeFrame}} minutes {{event.secondsRemaining}} - {{event.isOngoing}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['events', 'ongoingEvents'])
  },
  methods: {
    addNewEvent () {
      let event = {
        startedAt: new Date().getTime(),
        appointedTimeFrame: 10,
        initiatorName: 'Tobis'
      }
      this.$store.dispatch('addEvent', event)
    }
  }
}
</script>


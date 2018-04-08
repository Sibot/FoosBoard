<template>
  <v-container>
    <v-layout row>
      <v-btn @click="addNewEvent" v-if="isAuthenticated">Add Event</v-btn>
      <div v-for="event in ongoingEvents" :key="event.key">
        <event-item :event="event"></event-item>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import Event from './Event'
import { mapGetters } from 'vuex'
export default {
  components: {
    'event-item': Event
  },
  computed: {
    ...mapGetters(['events', 'isAuthenticated', 'ongoingEvents', 'profile', 'user'])
  },
  methods: {
    addNewEvent () {
      const uid = this.user.uid

      let event = {
        startedAt: new Date().getTime(),
        appointedTimeFrame: 10,
        initiator: { name: this.profile.name, uid: uid },
        players: {}
      }
      event.players[uid] = this.profile.name
      this.$store.dispatch('addEvent', event)
    }
  }
}
</script>


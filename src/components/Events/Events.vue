<template>
  <v-container>
    <v-layout row>
      <v-card>
        <v-card-title>
          <h2 class="headline text-xs-center">
            Broadcast a new event
          </h2>
        </v-card-title>
        <v-card-text>
          Feel like its time for a game of Foos?<br />
          Hit that button and see if anyone else feels the same!
        </v-card-text>
        <v-card-actions right>        
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="addNewEvent" v-if="isAuthenticated">Add Event</v-btn>
        </v-card-actions>
      </v-card>
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


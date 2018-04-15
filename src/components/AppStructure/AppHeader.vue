<template>
  <div>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      :fixed="fixed"
      mobile-break-point="900"
      app
    >
      <v-list>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/game" v-show="isAuthenticated">
          <v-list-tile-action>
            <v-icon>event</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Register Game</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/events" v-show="isAuthenticated">
          <v-list-tile-action>
            <v-badge right bottom v-if="ongoingEvents.length">
              <span slot="badge">{{ongoingEvents.length}}</span>
              <v-icon>event</v-icon>
            </v-badge>
            <v-icon v-else>event</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Events</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/history">
          <v-list-tile-action>
            <v-icon>history</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>History</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/statistics">
          <v-list-tile-action>
            <v-icon>poll</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Statistics</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/about">
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider light></v-divider>
        <v-list-tile to="/profile" v-show="isLoggedIn">
          <v-list-tile-action>
            <v-icon>account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/signin" v-show="isLoggedIn">
          <v-list-tile-action>
            <v-icon>lock_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title @click="signOut">Sign out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/signin" v-show="!isLoggedIn">
          <v-list-tile-action>
            <v-icon>lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign in</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-badge right bottom overlap v-if="ongoingEvents.length && isAuthenticated">
        <span slot="badge">{{ongoingEvents.length}}</span>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </v-badge>
      <v-toolbar-side-icon v-else @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-show="isAuthenticated">
        <v-btn flat to="/game">Register game</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/signup" v-show="!isLoggedIn">Sign up</v-btn>
        <v-btn flat to="/signin" v-show="!isLoggedIn">Sign in</v-btn>
        <v-btn flat to="/profile" v-show="isLoggedIn">Profile</v-btn>
        <v-btn flat to="/signin" v-show="isLoggedIn" @click="signOut">Sign out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      miniVariant: false,
      right: true,
      title: 'Official Foosball Score Tracker'
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'isLoggedIn', 'ongoingEvents'])
  },
  methods: {
    ...mapActions({
      signOut: 'signOut'
    })
  }
}
</script>

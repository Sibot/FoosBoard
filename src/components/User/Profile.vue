<template>
  <v-container fluid>
    <v-layout column align-center>
      <h2>Profile settings</h2>
      <v-form v-if="!user.emailVerified">
          <h3>Greeting {{displayName}}!</h3>
          <p>You need to verify your email '{{user.email}}'.</p>
          <v-btn @click="sendVerificationEmail()">Send verification email</v-btn>
      </v-form>
      <v-form>
        <v-text-field
          label="displayName"
          name="displayName"
          v-model="displayName">
        </v-text-field>
        <v-switch
          label="Enable Notifications"
          v-model="isNotificationsAllowed"
          @click="notify"
        ></v-switch>
        <v-btn @click="setProfile">Update Profile</v-btn>
        <v-btn @click="signOut">Sign out</v-btn>
      </v-form>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '../../firebaseInit'

export default {
  data () {
    return {
      displayName: '',
      isNotificationsAllowed: false
    }
  },
  created (owningView, myView) {
    this.getProfile()
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user'])
  },
  methods: {
    ...mapActions(['sendVerificationEmail', 'signOut', 'addNotification']),
    notify () {
      this.isNotificationsAllowed = !this.isNotificationsAllowed
      if (this.isNotificationsAllowed) {
        this.$store.dispatch('addNotification', { title: 'Notifications enabled!', body: 'Great, you´ll now get notified of important stuff going on!', icon: 'https://png.icons8.com/ios/50/000000/badge.png' })
      }
    },
    getProfile () {
      let db = firebase.database()
      db.ref(`players/${this.user.uid}/`).on('value', snap => {
        this.profile = snap.val()
        this.displayName = this.profile.name
        this.isNotificationsAllowed = this.profile.isNotificationsAllowed
      })
    },
    setProfile () {
      var profile = {
        uid: this.user.uid,
        displayName: this.displayName,
        isNotificationsAllowed: this.isNotificationsAllowed
      }
      this.$store.dispatch('setProfile', profile)
    },
    sendVerificationEmail () {
      this.$store.dispatch('sendVerificationEmail')
        .then(() => {
          this.$store.dispatch('addNotification', { title: 'Verification email sent!' })
        })
        .catch((error) => {
          this.$store.dispatch('addNotification', { title: `Unable to send verification email!`, body: `Error: '${error.message}'` })
        })
    }
  }
}
</script>

<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h2>{{ displayName }} Profile settings</h2>
        <div v-if="!user.emailVerified">
          <h3>Hello {{displayName}}!</h3>
          You logged in with {{user.emailVerified ? ``: `not`}} verified email {{user.email}}.
        <v-btn @click="sendVerificationEmail()">Send verification email</v-btn>
        </div>
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
    </v-slide-y-transition>
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
      let db = firebase.database()

      var updateProfile = {}
      updateProfile[`/name`] = this.displayName
      updateProfile[`/isNotificationsAllowed`] = this.isNotificationsAllowed

      db.ref(`players/${this.user.uid}/`).update(updateProfile).then(() => {
        this.$store.dispatch('addNotification', { title: 'Profile updated successfully!', body: 'The update was successfull!' })
      })
        .catch((error) => {
          this.$store.dispatch('addNotification', { title: `Unable to update profile`, body: `Error: '${error.message}'` })
        })
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

<template>
  <v-container fluid>
    <v-layout column align-center>
      <h2>Profile settings</h2>
      <v-form v-if="!user.emailVerified">
          <h3>Greetings {{displayName}}!</h3>
          <p>You need to verify your email '{{user.email}}'.</p>
          <v-btn @click="sendVerificationEmail" :color="isVerificationEmailSent ? 'success' : 'warning'">Send verification email</v-btn>
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
        <v-layout row>
          <v-avatar size='50' v-show="avatarUrl" class="mr-3">
            <img :src="avatarUrl" alt="A user avatar">
          </v-avatar>
          <v-text-field
          label="Avatar URL"
          name="avatar"
          v-model="avatarUrl">
        </v-text-field>
        </v-layout>
        <v-btn @click="setProfile" color="info" :disabled="isSaving">Update Profile</v-btn>
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
      avatarUrl: '',
      displayName: '',
      isNotificationsAllowed: false,
      isSaving: false,
      isVerificationEmailSent: false
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
      var allowNotificationsNotificationOptions = { title: 'Notifications enabled!', body: 'Great, you´ll now get notified of important stuff going on!', icon: 'https://png.icons8.com/ios/50/000000/badge.png' }
      this.isNotificationsAllowed = !this.isNotificationsAllowed
      if (this.isNotificationsAllowed) {
        this.$store.dispatch('addNotification', allowNotificationsNotificationOptions)
      }
    },
    getProfile () {
      let db = firebase.database()
      db.ref(`players/${this.user.uid}/`).on('value', snap => {
        this.profile = snap.val()
        this.displayName = this.profile.name
        this.isNotificationsAllowed = this.profile.isNotificationsAllowed
        this.avatarUrl = this.profile.avatarUrl
      })
    },
    profileIsSaved () {
      this.isSaving = false
    },
    setProfile () {
      this.isSaving = true
      var profile = {
        uid: this.user.uid,
        avatarUrl: this.avatarUrl,
        displayName: this.displayName,
        isNotificationsAllowed: this.isNotificationsAllowed
      }
      this.$store.dispatch('setProfile', profile).then(this.profileIsSaved)
    },
    sendVerificationEmail () {
      this.$store.dispatch('sendVerificationEmail')
        .then(() => { this.isVerificationEmailSent = true })
        .catch((error) => {
          this.isVerificationEmailSent = false
          this.$store.dispatch('addNotification', { title: `Unable to send verification email!`, body: `Error: '${error.message}'` })
        })
    }
  }
}
</script>

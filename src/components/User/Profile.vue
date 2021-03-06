<template>
  <v-container fluid>
    <v-layout column align-center>
        <v-card>
          <v-container>
            <h2 class="headline text-xs-center">Profile settings</h2>
            <v-form v-if="!user.emailVerified">
                <h3>Greetings {{displayName}}!</h3>
                <p>You need to verify your email '{{user.email}}'.</p>
                <v-btn v-if="!isVerificationEmailSent" @click="sendVerificationEmail" :color="isVerificationEmailSent ? 'success' : 'warning'">Send verification email</v-btn>
                <p v-if="isVerificationEmailSent">Refresh this page after you have verified your email</p>
            </v-form>
            <v-form>
                <v-text-field
                  label="Display name"
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
                <v-btn @click="setProfile" color="info" :disabled="isSaving">
                  Update Profile
                </v-btn>
            </v-form>
          </v-container>
        </v-card>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
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
  created () {
    this.$store.dispatch('getProfile').then((profile) => {
      if (profile) {
        this.avatarUrl = profile.avatarUrl
        this.displayName = profile.name
        this.isNotificationsAllowed = profile.isNotificationsAllowed
      }
    })
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['sendVerificationEmail', 'signOut', 'addNotification']),
    notify () {
      var allowNotificationsNotificationOptions = {
        title: 'Notifications enabled!',
        body: 'Great, you´ll now get notified of important stuff going on!',
        icon: 'https://png.icons8.com/ios/50/000000/badge.png',
        tag: 'enableNotifications'
      }
      this.isNotificationsAllowed = !this.isNotificationsAllowed
      if (this.isNotificationsAllowed) {
        this.$store.dispatch('addNotification', allowNotificationsNotificationOptions)
      }
    },
    setProfile () {
      this.isSaving = true
      var profile = {
        avatarUrl: this.avatarUrl,
        displayName: this.displayName,
        isNotificationsAllowed: this.isNotificationsAllowed
      }
      this.$store.dispatch('setProfile', profile).then(() => {
        this.isSaving = false
      })
    },
    sendVerificationEmail () {
      this.$store.dispatch('sendVerificationEmail')
        .then(() => { this.isVerificationEmailSent = true })
        .catch((error) => {
          this.isVerificationEmailSent = false
          this.$store.dispatch('addNotification', { title: `Unable to send verification email!`, body: `Error: '${error.message}'`, tag: 'error' })
        })
    }
  }
}
</script>

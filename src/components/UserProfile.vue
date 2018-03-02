<template>
<md-card>
  <md-card-header>
    <h2 class="md-title">Profile settings</h2>
  </md-card-header>
  <md-content class="profile-container">
    <md-card v-if="!user.emailVerified">
      <md-card-header>
        <h3 class="md-card-title">Hello {{this.user.displayName}}!</h3>
      </md-card-header>
      <md-card-content>
        You logged in with {{this.user.emailVerified ? ``: `not`}} verified email {{this.user.email}}.
      </md-card-content>
      <md-card-actions>
        <md-button class="md-raised" @click="sendVerificationEmail()">Send verification email</md-button>
      </md-card-actions>
    </md-card>
    <md-field>
      <label for="displayname">Display name:</label>
      <md-input type="text" placeholder="Displayname" name="displayname" v-model="displayName"></md-input>
    </md-field>
    <md-button class="md-raised" @click="updateProfile()">Save profile</md-button>

    <md-button class="md-raised md-primary" v-on:click="signOut()">Logout</md-button>
  </md-content>
</md-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      signOut: 'signOut',
      sendVerificationEmail: 'sendVerificationEmail'
    }),
    updateProfile () {
      let newProfile = {}
      if (this.user.displayName !== this.displayName) {
        newProfile.displayName = this.displayName
      }
      this.$store.dispatch('updateProfile', newProfile)
        .then(() => {
          this.$store.dispatch('notification', { message: 'Profile updated successfully!' })
        })
        .catch(() => {
          this.$store.dispatch('notification', { message: 'Unable to update profile' })
        })
    },
    sendVerificationEmail () {
      this.$store.dispatch('sendVerificationEmail')
        .then(() => {
          this.$store.dispatch('notification', { message: 'Verification email sent!' })
        })
        .catch(() => {
          this.$store.dispatch('notification', { message: 'Unable to send verification email!' })
        })
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user'])
  }
}
</script>
<style scoped>

</style>

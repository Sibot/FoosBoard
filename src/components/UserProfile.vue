<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h2 class="md-title">{{ user.displayName }} Profile settings</h2>
        <div v-if="!user.emailVerified">
          <h3 class="md-card-title">Hello {{user.displayName}}!</h3>
          You logged in with {{user.emailVerified ? ``: `not`}} verified email {{user.email}}.
        <md-button class="md-raised" @click="sendVerificationEmail()">Send verification email</md-button>
        </div>
        <v-form>
          <v-text-field
            label="displayName"
            name="displayName"
            v-model="displayName">
          </v-text-field>
          <v-btn @click="updateProfile">Update Profile</v-btn>
        </v-form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      displayName: ''
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user'])
  },
  methods: {
    ...mapActions({
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
  }
}
</script>
<style scoped>

</style>

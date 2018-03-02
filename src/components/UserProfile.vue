<template>
  <div class="profile-container">
    Hello {{this.user.displayName}}!
    <span v-if="user">
      You logged in with {{this.user.emailVerified ? ``: `not`}} verified email {{this.user.email}}
    </span>
    <input type="text" placeholder="Displayname" name="displayname" v-model="displayName">

    <button class="button" @click="updateProfile()">Save profile</button>

    <button class="button" v-on:click="signOut()">Logout</button>
    <div>
      <button @click="sendVerificationEmail()">Send verification email</button>
    </div>
  </div>

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

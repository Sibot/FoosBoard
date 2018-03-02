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
import appService from '../app.service'
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      signOut: 'signOut'
    }),
    updateProfile () {
      let newProfile = {}
      if (this.user.displayName !== this.displayName) {
        newProfile.displayName = this.displayName
      }
      this.$store.dispatch('updateProfile', newProfile).then(() => {
        console.log(this.user.displayName)
      })
    },
    sendVerificationEmail () {
      appService.sendVerificationEmail(this.user.email)
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user'])
  }
}
</script>
<style scoped>

</style>

<template>
  <div class="profile-container">
    Hello authenticated user!
    <span v-if="user">
      You logged in with {{this.user.emailVerified ? ``: `not`}} verified email {{this.user.email}}
    </span>
    <input type="text" placeholder="Displayname" name="displayname" v-model="user.displayName">

    <button class="button" @click="saveProfile()">Save profile</button>

    <button class="button" v-on:click="logout()">Logout</button>
    <div>
      <button @click="sendVerificationEmail()">Send verification email</button>
    </div>
  </div>

</template>
<script>
import appService from '../app.service'
import { mapGetters } from 'vuex'
export default {
  methods: {
    sendVerificationEmail: function () {
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

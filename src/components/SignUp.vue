<template>
  <div>
    <div v-if="isAuthenticated">
      <user-profile></user-profile>
    </div>
    <div v-else>
      <h2>Sign up!</h2>
      <div class="field is-horizontal">
        <label for="email">Email</label>
        <input name="email" type="text" placeholder="Email" v-model="userEmail" />
      </div>
      <div class="field is-horizontal">
        <label for="password">Password</label>
        <input name="password" type="password" placeholder="Password" v-model="userPassword" />
      </div>
      <div class="field is-horizontal">
        <button class="button" v-on:click="signup()">Sign up!</button>
      </div>
      <div class="error" v-if="clearFlag">{{signUpErrorMessage}}</div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import UserProfile from './UserProfile'
import appService from '../app.service'

export default {
  components: {
    'user-profile': UserProfile
  },
  data () {
    return {
      userEmail: '',
      userPassword: '',
      signUpErrorMessage: '',
      clearToken: ''
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    clearFlag: function () {
      return (this.userEmail + this.userPassword) !== this.clearToken
    }
  },
  methods: {
    ...mapActions['signup'],
    signup () {
      this.signUpMessage = ''
      this.clearToken = this.userEmail + this.password
      appService.signUp({ email: this.userEmail, password: this.userPassword })
        .then(() => {
          // todo route to signin
        })
        .catch((error) => {
          this.signUpErrorMessage = error.message
        })
    }
  }
}
</script>

<template>
  <div>
    <md-card>
      <md-card-header>
        <h2 class="md-title">Sign up!</h2>
      </md-card-header>
      <md-card-content>
        <md-field class="">
          <label for="email">Email</label>
          <md-input name="email" type="email" required v-model="userEmail"></md-input>
        </md-field>
        <md-field class="">
          <label for="userPassword">Password</label>
          <md-input name="userPassword" type="password" required v-model="userPassword"></md-input>
        </md-field>
        <div class="error" v-if="clearFlag">{{signUpErrorMessage}}</div>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-raised md-primary" v-on:click="signUp()">Sign up!</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UserProfile from './UserProfile'

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
    signUp () {
      this.$store.dispatch('signUp', { email: this.userEmail, password: this.userPassword })
        .then(() => {
          this.$router.push('signIn')
        })
        .catch((error) => {
          this.signUpErrorMessage = error.message
        })

      // this.signUpMessage = ''
      // this.clearToken = this.userEmail + this.password
      // appService.signUp({ email: this.userEmail, password: this.userPassword })
    }
  }
}
</script>

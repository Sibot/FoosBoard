<template>
  <v-form>
    <v-card>
      <v-card-title>
        <h2>Sign up!</h2>
      </v-card-title>
      <v-card-text>
          <v-text-field
            name="email"
            type="email"
            label="Email"
            required
            v-model="userEmail"></v-text-field>
          <v-text-field
            name="userPassword"
            type="password"
            label="Password"
            required
            v-model="userPassword"></v-text-field>
        <div class="error" v-if="clearFlag">{{signUpErrorMessage}}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn v-on:click="signUp()">Sign up!</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
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
          this.clearToken = this.userEmail + this.userPassword
          this.signUpErrorMessage = error.message
        })

      // this.signUpMessage = ''
      // this.clearToken = this.userEmail + this.password
      // appService.signUp({ email: this.userEmail, password: this.userPassword })
    }
  }
}
</script>

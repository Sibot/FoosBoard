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
            label="Password"
            name="password"
            v-model="userPassword"
            :append-icon="visiblePassword ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (visiblePassword = !visiblePassword)"
            :type="visiblePassword ? 'text' : 'password'"
            required>
          </v-text-field>
          <v-text-field
            name="display-name"
            type="text"
            label="Display name"
            required
            v-model="userDisplayName"></v-text-field>
        <div class="error" v-if="showError">{{signUpErrorMessage}}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn v-on:click="signUp()">Sign up!</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      userEmail: '',
      userPassword: '',
      userDisplayName: '',
      signUpErrorMessage: '',
      clearToken: '',
      visiblePassword: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    showError: function () {
      return (this.userEmail + this.userPassword) === this.clearToken
    }
  },
  methods: {
    signUp () {
      this.$store.dispatch('signUp', { email: this.userEmail, password: this.userPassword, displayname: this.displayName })
        .then(() => {
          this.$router.push('profile')
          this.$store.dispatch('addNotification', { title: 'Welcome', body: 'Welcome to the foosboard!' })
        })
        .catch((error) => {
          this.clearToken = this.userEmail + this.userPassword
          this.signUpErrorMessage = error.message
          this.$store.dispatch('addNotification', { title: 'An error occured', body: error.message })
        })

      // this.signUpMessage = ''
      // this.clearToken = this.userEmail + this.password
      // appService.signUp({ email: this.userEmail, password: this.userPassword })
    }
  }
}
</script>

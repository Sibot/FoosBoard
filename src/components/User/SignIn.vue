<template>
  <v-form>
    <user-profile v-if="isAuthenticated"></user-profile>
    <v-card v-if="!isAuthenticated">
      <v-card-title>
        <h2>Sign in!</h2>
      </v-card-title>
      <v-card-text>
          <v-text-field
            label="Email"
            name="email"
            v-model="userEmail"
            required>
          </v-text-field>
          <v-text-field
            label="Password"
            name="password"
            v-model="userPassword"
            :append-icon="visiblePassword ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (visiblePassword = !visiblePassword)"
            :type="visiblePassword ? 'text' : 'password'"
            required>
          </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="!isAuthenticated" @click="signIn">Sign In</v-btn>
        <v-btn v-if="!isAuthenticated" @click="quickLogin">Quick login</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
import { mapGetters } from 'vuex'
import UserProfile from './Profile'
export default {
  components: {
    'user-profile': UserProfile
  },
  data () {
    return {
      userEmail: '',
      userPassword: '',
      loginMessage: '',
      visiblePassword: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    signIn () {
      this.$store.dispatch('signIn', { email: this.userEmail, password: this.userPassword })
        .catch((error) => this.$store.dispatch('notification', error.message))
    },
    quickLogin () {
      this.userEmail = 'firebase@tobis.se'
      this.userPassword = 'abcdef'
      this.signIn()
    }
  }
}
</script>

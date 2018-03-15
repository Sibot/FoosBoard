<template>
 <v-container fluid>
   <user-profile v-if="isAuthenticated"></user-profile>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-form>
          <v-text-field
            label="email"
            name="email"
            v-model="userEmail"
            required>
          </v-text-field>
          <v-text-field
            label="password"
            name="password"
            v-model="userPassword"
            required>
          </v-text-field>
          <v-btn @click="signIn">Sign In</v-btn>
          <v-btn @click="quickLogin">Quick login</v-btn>
        </v-form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import UserProfile from './UserProfile'
import DigitSelector from './DigitSelector'
export default {
  components: {
    'user-profile': UserProfile,
    'digit-selector': DigitSelector
  },
  data () {
    return {
      userEmail: '',
      userPassword: '',
      loginMessage: ''
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    signIn () {
      this.$store.dispatch('signIn', { email: this.userEmail, password: this.userPassword })
    },
    quickLogin () {
      this.userEmail = 'firebase@tobis.se'
      this.userPassword = 'abcdef'
      this.signIn()
    }
  }
}
</script>

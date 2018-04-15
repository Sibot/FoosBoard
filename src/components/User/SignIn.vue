<template>
  <v-form>
    <v-card v-if="!isAuthenticated">
      <v-card-title>
        <h2 class="headline text-xs-center">Sign in!</h2>
      </v-card-title>
      <v-card-text>
          <v-text-field
            label="Email"
            name="email"
            v-model="userEmail"
            @keyup.enter="signIn"
            required>
          </v-text-field>
          <v-text-field
            label="Password"
            name="password"
            v-model="userPassword"
            :append-icon="visiblePassword ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (visiblePassword = !visiblePassword)"
            :type="visiblePassword ? 'text' : 'password'"
            @keyup.enter="signIn"
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

export default {
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
        .then(() => {
          this.$router.push('/profile')
        })
        .catch((error) => this.$store.dispatch('addNotification', { title: 'An error occured', body: error.message }))
    },
    quickLogin () {
      this.userEmail = 'firebase@tobis.se'
      this.userPassword = 'abcdef'
      this.signIn()
    }
  }
}
</script>

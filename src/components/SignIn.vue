<template>
  <div>
    <md-card v-if="isAuthenticated">
       <user-profile></user-profile>
    </md-card>
    <md-card v-else>
      <md-card-header>
        <h2 class="md-title">Sign in!</h2>
      </md-card-header>
      <md-card-content>
        <md-field class="">
          <label for="email">Email</label>
          <md-input name="email" type="text" v-model="userEmail"></md-input>
        </md-field>
        <md-field class="">
          <label for="password">Password</label>
          <md-input name="password" type="password" v-model="userPassword"></md-input>
        </md-field>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-raised md-primary" v-on:click="signIn()">Sign in</md-button>
        <md-button class="md-raised" v-on:click="quickLogin()">Quick Login</md-button>
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

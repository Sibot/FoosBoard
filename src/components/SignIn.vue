<template>
  <div>
    <div v-if="isAuthenticated">
       <user-profile></user-profile>
    </div>
    <div v-else>
      <h2>Login</h2>
      <div class="field is-horizontal">
        <label for="email">Email</label>
        <input name="email" type="text" placeholder="Email" v-model="userEmail" />
      </div>
      <div class="field is-horizontal">
        <label for="password">Email</label>
        <input name="password" type="password" placeholder="Password" v-model="userPassword" />
      </div>
      <div class="field is-horizontal">
        <md-button class="button md-raised md-primary" v-on:click="signIn()">Login</md-button>
      </div>
      <md-button class="button md-raised" v-on:click="quickLogin()">Quick Login</md-button>
    </div>
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

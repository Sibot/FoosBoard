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
        <button class="button" v-on:click="login()">Login</button>
      </div>
      <button class="button" v-on:click="quickLogin()">Quick Login</button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
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
    ...mapActions({
      logout: 'logout'
    }),
    login () {
      this.$store.dispatch('login', {email: this.userEmail, password: this.userPassword})
    },
    quickLogin () {
      this.userEmail = 'firebase@tobis.se'
      this.userPassword = 'abcdef'
      this.login()
    }
  }
}
</script>

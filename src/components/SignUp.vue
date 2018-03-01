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
        <label for="password">Email</label>
        <input name="password" type="password" placeholder="Password" v-model="userPassword" />
      </div>
      <div class="field is-horizontal">
        <button class="button" v-on:click="signup()">Sign up!</button>
      </div>
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
    ...mapActions['signup'],
    signup () {
      this.$store.dispatch('signup', {email: this.userEmail, password: this.userPassword})
    }
  }
}
</script>

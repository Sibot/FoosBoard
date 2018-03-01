<template>
  <nav class="nav">
    <md-tabs class="nav-list">
        <md-tab v-if="isAuthenticated" md-label="Register game" to="/game" class="nav-list-item-link"></md-tab>
        <md-tab md-label="Blog" to="/blog" class="nav-list-item-link"></md-tab>
        <md-tab :md-label="isAuthenticatedActionText" to="/signin" class="nav-list-item-link"></md-tab>
        <md-tab md-label="Sign up" v-if="!isAuthenticated" to="/signup" class="nav-list-item-link"></md-tab>
    </md-tabs>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isAuthenticatedActionText: this.isAuthenticated ? 'Sign out' : 'Sign in'
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  }
}

</script>

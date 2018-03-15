<template>
  <v-app>
    <app-header></app-header>
    <v-content>
      <router-view/>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppHeader from './components/AppStructure/AppHeader'
import AppFooter from './components/AppStructure/AppFooter'

export default {
  name: 'App',
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono|Material+Icons');

body {
  font-family: 'Ubuntu Mono', monospace;
}
</style>

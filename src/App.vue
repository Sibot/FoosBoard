<template>
  <div id="app">
    <div class="header">
      <app-header></app-header>
    </div>
    <router-view/>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter
  }
}
</script>

<style lang="scss">
  @import '~reset-css/_reset.scss';
  @import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono');
body {
  font-family: 'Ubuntu Mono', monospace;
}
.button {

}
</style>

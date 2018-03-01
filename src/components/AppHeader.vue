<template>
  <nav class="nav">
    <div class="nav-list">
      <div v-if="isAuthenticated" class="nav-list-item">
        <router-link to="/game" class="nav-list-item-link">
          <div class="link-item">
            Register a game
          </div>
        </router-link>
      </div>
      <div class="nav-list-item">
        <router-link to="/blog" class="nav-list-item-link">
          <div class="link-item">
            Blog
          </div>
        </router-link>
      </div>
      <div class="nav-list-item">
        <router-link to="/signin" class="nav-list-item-link">
          <div class="link-item">
            {{isAuthenticated ? `Sign out` :  `Sign in`}}
          </div>
        </router-link>
      </div>
      <div v-if="!isAuthenticated" class="nav-list-item">
        <router-link to="/signup" class="nav-list-item-link">
          <div class="link-item">
            Sign up
          </div>
        </router-link>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated'])
  }
}

</script>
<style scoped>
.nav-list {
  list-style-type: none;
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px,1fr));
}
.nav-list-item {
}
.nav-list-item-link{
  color:black;
  text-decoration: none;
}
.link-item {
  text-align: center;
  padding: 5px;
  background-color: #aaa;
  width: 100%;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #555;
  border-left: 1px solid #555;
}
.link-item:hover {
  border-top: 1px solid #555;
  border-right: 1px solid #555;
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  background-color: #ddd;
}

</style>

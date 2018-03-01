import Vue from 'vue'
import App from './App'
import store from './vuex/index'
import router from './router'
import * as firebase from 'firebase'

Vue.config.productionTip = false

var config = {
  apiKey: 'AIzaSyDFqEKhb0Ac0bJTvkftlmi0oNVY5t1500o',
  authDomain: 'ofoosboard.firebaseapp.com',
  databaseURL: 'https://ofoosboard.firebaseio.com',
  projectId: 'ofoosboard',
  storageBucket: 'ofoosboard.appspot.com',
  messagingSenderId: '913166784999'
}

firebase.initializeApp(config)

new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})

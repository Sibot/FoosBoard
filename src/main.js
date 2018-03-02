import Vue from 'vue'
import App from './App'
import store from './vuex/index'
import router from './router'
import * as firebase from 'firebase'
import {
  MdTabs,
  MdButton,
  MdField,
  MdContent,
  MdCard
} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

Vue.config.productionTip = false

Vue.use(MdButton)
Vue.use(MdTabs)
Vue.use(MdField)
Vue.use(MdContent)
Vue.use(MdCard)

var config = {
  apiKey: 'AIzaSyDFqEKhb0Ac0bJTvkftlmi0oNVY5t1500o',
  authDomain: 'ofoosboard.firebaseapp.com',
  databaseURL: 'https://ofoosboard.firebaseio.com',
  projectId: 'ofoosboard',
  storageBucket: 'ofoosboard.appspot.com',
  messagingSenderId: '913166784999'
}

firebase.initializeApp(config)

var app = new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})

export default app

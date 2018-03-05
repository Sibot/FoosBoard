import Vue from 'vue'
import App from './App'
import store from './vuex/index'
import router from './router'
import {
  MdTabs,
  MdButton,
  MdField,
  MdContent,
  MdCard,
  MdRadio,
  MdDatepicker,
  MdAutocomplete,
  MdMenu,
  MdList
} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false

Vue.use(MdButton)
Vue.use(MdTabs)
Vue.use(MdField)
Vue.use(MdContent)
Vue.use(MdCard)
Vue.use(MdRadio)
Vue.use(MdDatepicker)
Vue.use(MdAutocomplete)
Vue.use(MdMenu)
Vue.use(MdList)

var app = new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})

export default app

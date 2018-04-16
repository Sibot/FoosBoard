import Vue from 'vue'
import App from './App'
import store from './vuex/index'
import router from './router'
import '../node_modules/vuetify/src/stylus/app.styl'
import {
  Vuetify,
  VApp,
  VAvatar,
  VBadge,
  VCard,
  VChip,
  VDatePicker,
  VDivider,
  VNavigationDrawer,
  VFooter,
  VForm,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VRadioGroup,
  VSelect,
  VSlider,
  VStepper,
  VSubheader,
  VSwitch,
  VToolbar,
  VTextField,
  transitions
} from 'vuetify'

Vue.use(Vuetify, {
  components: {
    VApp,
    VAvatar,
    VBadge,
    VCard,
    VChip,
    VDatePicker,
    VDivider,
    VNavigationDrawer,
    VFooter,
    VForm,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VRadioGroup,
    VSelect,
    VSlider,
    VStepper,
    VSubheader,
    VSwitch,
    VTextField,
    VToolbar,
    transitions
  }
})

// Vue.config.productionTip = false

store.dispatch('initUsers').then(() => {
  store.dispatch('initPlayers').then(() => {
    store.dispatch('initEvents')
    store.dispatch('initGames')
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
  })
})
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js', { scope: '.' })
}

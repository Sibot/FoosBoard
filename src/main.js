import Vue from 'vue'
import App from './App'
import store from './vuex/index'
import router from './router'
import {
  Vuetify,
  VApp,
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
  VToolbar,
  VTextField,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
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
    VTextField,
    VToolbar,
    transitions
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

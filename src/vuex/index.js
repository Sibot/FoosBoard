import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import gameDb from './modules/gameDb'
import notification from './modules/notification'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    notification,
    gameDb
  }
})

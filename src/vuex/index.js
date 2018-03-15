import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import gameDb from './modules/gameDb'
import playersDb from './modules/playersDb'
import notification from './modules/notification'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    notification,
    gameDb,
    playersDb
  }
})

store.dispatch('initPlayers')
store.dispatch('initGames')

export default store

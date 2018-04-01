import Vue from 'vue'
import Vuex from 'vuex'
import usersDb from './modules/usersDb'
import gamesDb from './modules/gamesDb'
import playersDb from './modules/playersDb'
import notification from './modules/notification'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    gamesDb,
    notification,
    playersDb,
    usersDb
  }
})

store.dispatch('initUsers').then(() => {
  store.dispatch('initPlayers')
})
store.dispatch('initGames')

export default store

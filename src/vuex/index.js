import Vue from 'vue'
import Vuex from 'vuex'
import eventsDb from './modules/eventsDb'
import usersDb from './modules/usersDb'
import gamesDb from './modules/gamesDb'
import playersDb from './modules/playersDb'
import notification from './modules/notification'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    eventsDb,
    gamesDb,
    notification,
    playersDb,
    usersDb
  }
})

export default store

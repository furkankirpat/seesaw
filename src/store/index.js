import Vue from 'vue'
import Vuex from 'vuex'

import settingsModule from './modules/settings'
import loginComponentModule from './modules/login'
import gameComponentModule from './modules/game'
import finishComponentModule from './modules/finish'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    settingsModule,
    loginComponentModule,
    gameComponentModule,
    finishComponentModule
  }
})

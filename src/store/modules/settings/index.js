import * as getters from './getters'
import * as mutations from './mutations'

const state = {
    activeComponent: "Login",
    gameLap:3
}

export default {
    namespaced:true,
    state,
    getters,
    mutations
}
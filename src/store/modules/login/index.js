import * as getters from './getters'
import * as mutations from './mutations'

const state = {
    username:null
}

export default {
    namespaced:true,
    state,
    getters,
    mutations
}
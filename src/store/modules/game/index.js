import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

const state = {
    points:{
        user:0,
        computer:0
    },
    selectedObjects:{
        clientObjects:[],
        computerObjects:[]
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions,
}
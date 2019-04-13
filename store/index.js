import Vuex from 'vuex'

export const state = _ => {
    return {
        tokenStr: ""
    }
}

export const mutations = {
    setTokenStr: function (state, payload) {
        state.tokenStr = payload
    }
}
const state = () => {
    position: {}
}

const mutations = {
    setPosition(state, val) {
        state.position = val
    },
    setCity(state, val) {
        state.position.city = val
    }
}

const actions = {
    setPosition: ({ commit }, position) => {
        commit('setPosition', position)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
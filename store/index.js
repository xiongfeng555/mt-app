// export const store = () => new Vuex.Store({
//     modules: {
//         geo
//     },
//     actions: {
//         async nuxtServerInit({ commit }, { req, app }) {
//             console.log('123')
//             let result = await app.$axios.get('/geo/getPosition')
//                 // commit('geo/setPosition', status === 200 ? { city, province } : { city: '', province: '' })
//             console.log(result)
//         }
//     }
// })

// export const modules = {
//     geo
// }
export const actions = {
    async nuxtServerInit({ commit }, { req, app }) {
        let { status, data: { city, province } } = await app.$axios.get('/geo/getPosition')
        commit("geo/setPosition", { city, province })
        let result = await app.$axios.get('/geo/menu')
        commit("home/setMenu", result.data.menu.menu);
        let { status: status2, data: { search } } = await app.$axios.get('/search/hotSearch')
        commit('home/setHotPlace', search)
    }
}
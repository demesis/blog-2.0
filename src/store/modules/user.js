export default {
    namespaced: true,
    state() {
        return {
            userInfo: {}
        }
    },
    mutations: {
        updateUser(state, value) {
            state.userInfo = value
        },
        userUpdate(state, value) {
            state.userInfo.user = value
        }

    },
    actions: {

    },
    getters: {

    }
}
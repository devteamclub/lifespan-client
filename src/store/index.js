import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    userMetamaskAddress: null
  },
  getters: {
    getUser: (state) => state.user,
    getUserMetamaskAddress: (state) => state.userMetamaskAddress
  },
  mutations: {
    SET_USER(state, user) {
      this.state.user = user
    },
    SET_USER_METAMASK_ADDRESS(state, address) {
      this.state.userMetamaskAddress = address
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user)
    },
    setUserMetamaskAddress({ commit }, address) {
      commit('SET_USER_METAMASK_ADDRESS', address)
    }
  }
})

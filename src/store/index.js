import Vue from 'vue'
import Vuex from 'vuex'
export const events = {
  onTokenChange: [],
}


Vue.use(Vuex)

const state = {
  token: '',
  username: '',
  avatar: '',
  org: '',
  shouldClearToken: true,
}

const mutations = {
  updateUserInfo(state, { token, username, avatar, org }) {
    state.token = token
    state.username = username
    state.avatar = avatar
    state.org = org
  },
  removeUserInfo(state) {
    state.token = ''
    state.username = ''
    state.avatar = ''
    state.org = ''
  },
  shouldClearToken(state, bool) {
    state.shouldClearToken = bool
  }
}



const getters = {
  isLogin(state) {
    return state.token ? true : false
  },
  getUserInfo({ username, avatar, org }) {
    return { username, avatar, org }
  },
  getToken({ token }) {
    return token
  }
}

export const userInfo = {
  namespaced: true,
  state,
  mutations,
  getters,
  // actions
}

const store = new Vuex.Store({
  modules: { userInfo }
})
  ;
(window).ss = store

export default store

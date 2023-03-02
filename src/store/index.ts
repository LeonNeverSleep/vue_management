import { createStore } from 'vuex'

export default createStore({
  state: {
    username: '',
    adminLevel: 1,
    token: '',
    password: '',
    address: '',
    phone: '',
    editRelic: {},
    userList: []
  },
  getters: {
  },
  mutations: {
    changeUsername(state, data) {
      state.username = data
    },
    changeAdminLevel(state, data) {
      state.adminLevel = data
    },
    changeToken(state, data) {
      state.token = data
    },
    changePassword(state, data) {
      state.password = data
    },
    changeAddress(state, data) {
      state.address = data
    },
    changePhone(state, data) {
      state.phone = data
    },
    changeEditRelic(state, data) {
      state.editRelic = data
    },
    changeUserList(state, data) {
      state.userList = data
    }
  },
  actions: {
  },
  modules: {
  }
})

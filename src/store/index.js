// Create the local storage space to hold the authentication token and other info
import { createStore } from 'vuex'

export default createStore({
  state: {
    log_user: ""
  },
  getters: {
 
  },
  mutations: {
    initializeStore(state) {

      if (localStorage.getItem("log_user")) {
        state.log_user = localStorage.getItem("log_user")
      } else {
        state.log_user = ''
      }
    },
    setLog_User(state, username) {
      state.log_user = username
    }
  },
  actions: {
  },
  modules: {
  }
})

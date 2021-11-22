import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import createMultiTabState from 'vuex-multi-tab-state';
// import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [ 
    // check browser-> F12 -> Application for details 
    //createMultiTabState(), // it is stored in localStorage
    createPersistedState({ // it is stored in the sessionStorage
      storage: window.sessionStorage,
        //{
        // getItem: (key) => Cookies.get(key),
        // // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        // setItem: (key, value) =>
        //   Cookies.set(key, value, { expires: 3, secure: true }),
        // removeItem: (key) => Cookies.remove(key),
        //}
    })
  ],
  state: {
    username: '',
    identity: '',
  },
  mutations: {// only one parameter is allowed to pass in, second param is preset for other purpose
    assignUser(state, body) {
      state.username = body.name;
      state.identity = body.role;
    },
  },
  actions: { // only one parameter is allowed to pass in, second param is preset for other purpose
    assign_user({ commit }, body) {
      commit("assignUser", body);
    }
  },
  modules: {
  }
})

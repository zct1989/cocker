import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import commonModule from './common'

Vue.use(Vuex)

const store = new Vuex.Store({
  // modules: {
  //   example
  // },
  ...commonModule,
  plugins: [
    // 持久化存储插件
    createPersistedState({
      key: "vuex",
      storage: localStorage
    })
  ]
})

export default store

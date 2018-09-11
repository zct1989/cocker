import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import commonModule from './common'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    ...commonModule,
    plugins: [
      // 持久化存储插件
      createPersistedState({
        key: "vuex",
        storage: localStorage
      })
    ]
  })

  return Store
}

import Vuex from 'vuex'

/**
 * 应用内部数据存储
 */
export const applicationStore = new Vuex.Store({
  state: {
    // 系统准备状态
    ready: false,
    // 当前布局
    layout: "DefaultLayout"
  },
  mutations: {
    /**
     * 更新系统启动状态
     * @param state 
     */
    ready(state) {
      state.ready = true
    },
    /**
     * 更新当前布局
     * @param state 
     * @param layout 
     */
    updateLayout(state, layout) {
      state.layout = layout
    }
  }
})


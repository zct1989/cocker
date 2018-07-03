/**
 * 更新应用状态
 * @param state 
 * @param ready 
 */
export const updateReady = (state, ready) => {
  state.ready = ready
}

/**
 * 更新布局
 * @param state 
 * @param layout 
 */
export const updateLayout = (state, layout) => {
  state.currentLayout = layout
}
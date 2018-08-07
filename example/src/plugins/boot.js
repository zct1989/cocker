// import something here
// import App from '~/App.vue'
import Cocker from '@cocker/core'
// leave the export, even if you don't use it
export default async ({ app, store, router }) => {
  // 初始化
  new Cocker({
    // app: App,
    router,
    store,
    bootstrap: {
      plugin: [],

    }
  })
}

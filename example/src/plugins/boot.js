// import something here
// import App from '~/App.vue'
import appConfig from '../config/app.config.ts'
import Cocker from '@cocker/core'
import { RequestService } from '@cocker/core/http'
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

  RequestService.setConfig({
    server: appConfig.server,
    timeout: 3000
  })
}

import Vue from 'vue'
import VueRouter from 'vue-router'
import createRoutes from './routes'

Vue.use(VueRouter)

// DO NOT import the store here as you will receive it as
// parameter in the default exported function:

export default function ({ store }) {
  // IMPORTANT! Instantiate Router inside this function

  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: createRoutes([]),
    // Leave these as they are and change from quasar.conf.js instead!
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  })

  return Router
}
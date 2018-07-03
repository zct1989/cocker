
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  beforeCreate() {
    // Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
    // 动态加载布局文件
    let requireLayout = (): Array<any> => {
      let req = require.context("src/layouts", false, /\.vue$/);
      return (requireContext => requireContext.keys().map(requireContext))(
        req
      ).map((layout: any) => ({
        name: layout.default.options.name,
        component: layout.default
      }));
    };

    // 导入动态组件
    let importComponents = ({ name, component }) => {
      let components = this.$options.components;
      if (components) {
        components[name] = component;
      }
    };

    // 导入布局
    requireLayout().forEach(importComponents);
  },
  components: {
    // NuxtLoading
  }
})
export default class App extends Vue {
  render(h, props) {
    // const loadingEl = h('nuxt-loading', { ref: 'loading' })
    // 创建布局元素
    const layoutEl = h(this.$cocker.state.layout)
    // 创建模板元素
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.$cocker.layout
    }, [layoutEl])

    // 创建过渡元素
    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [templateEl])

    return h('div', {
      domProps: {
        id: 'q-app'
      }
    }, [
        // loadingEl,
        transitionEl
      ])
  }

  created() {
    // // Add this.$nuxt in child instances
    // Vue.prototype.$nuxt = this
    // // add to window so we can listen when ready
    // if (typeof window !== 'undefined') {
    //   window.$nuxt = this
    // }
    // // Add $nuxt.error()
    // this.error = this.nuxt.error
  }

  mounted() {
    // this.$loading = this.$refs.loading
  }

  errorChanged() {
    // if (this.nuxt.err && this.$loading) {
    //   if (this.$loading.fail) this.$loading.fail()
    //   if (this.$loading.finish) this.$loading.finish()
    // }
  }

  // loadLayout(layout) {
  //   if (!layout || !(layouts['_' + layout] || resolvedLayouts['_' + layout])) layout = 'default'
  //   let _layout = '_' + layout
  //   if (resolvedLayouts[_layout]) {
  //     return Promise.resolve(resolvedLayouts[_layout])
  //   }
  //   return layouts[_layout]()
  //     .then((Component) => {
  //       resolvedLayouts[_layout] = Component
  //       delete layouts[_layout]
  //       return resolvedLayouts[_layout]
  //     })
  //     .catch((e) => {
  //       if (this.$nuxt) {
  //         return this.$nuxt.error({ statusCode: 500, message: e.message })
  //       }
  //     })
  // }
}
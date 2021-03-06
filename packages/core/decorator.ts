import "reflect-metadata";
import { createDecorator } from 'vue-class-component'
import injector from 'vue-inject';
import { empty } from 'rxjs';
// import * as UUID from "uuidjs";

/**
 * 组件内依赖注入
 * @param target
 */
export function Dependencies(target?: any) {
  return createDecorator((componentOptions, key) => {
    if (!injector.$$factories[key] && target) {
      injector.service(key, target);
    }

    if (typeof componentOptions['dependencies'] === 'undefined') {
      componentOptions['dependencies'] = []
    }

    if (Array.isArray(componentOptions['dependencies'])) {
      componentOptions['dependencies'].push(key)
    }
  })
}

/**
 * 组件内依赖注入
 * @param target
 */
export function Validations(rules: any) {
  return createDecorator((componentOptions, key) => {
    if (componentOptions['_validations_'] === undefined) {
      componentOptions['_validations_'] = {}
    }

    componentOptions['_validations_'][key] = rules

    if (componentOptions['validations'] === undefined) {
      componentOptions['validations'] = function () {
        return componentOptions['_validations_']
      }
    }
  })
}




/**
 * 直接依赖注入
 */
export function Inject(target?): PropertyDecorator {
  return function (container, key) {
    if (!injector.$$factories[key] && target) {
      injector.service(key, target).lift;
    }

    try {
      container[key] = injector.get(key);
    }
    catch (ex) {
      console.warn(ex)
    }
  }
}

/**
 * 函数去抖动
 * @param time
 */
export function Debounce(time: number = 500) {
  return function (target, name, descriptor) {
    var oldValue = descriptor.value;
    let flag
    descriptor.value = function () {
      if (flag) {
        return empty()
      } else {
        flag = setTimeout(() => {
          flag = null
        }, time)
      }
      return oldValue.apply(target, arguments);
    };

    return descriptor;
  }
}

/**
 * 设置布局
 * @param target
 */
export function Layout(layout: String) {
  return function (target) {
    target.$layout = layout;
    return target;
  }
}

/**
 * 路由守卫
 * @param option 
 */
export function RouterGuard(option: { path?: RegExp | Function }) {
  return function (target, name, descriptor) {
    var oldValue = descriptor.value;
    let flag
    descriptor.value = function ({ store, router }, { to, from, next }) {
      if (!option || !option.path) {
        return () => true
      }

      if (option.path instanceof RegExp && option.path.test(to.path)) {
        return oldValue.apply(target, arguments);
      }

      if (option.path instanceof Function && option.path(to.path)) {
        return oldValue.apply(target, arguments);
      }

      return () => true
    };

    return descriptor;
  }
}

import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0ac75744 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _ffc1e9da = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _f80ac096 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _48f856f5 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _67529857 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _22650abe = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _2fc29a42 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _0ac75744,
    children: [{
      path: "/",
      component: _ffc1e9da,
      name: "home"
    }, {
      path: "/login",
      component: _f80ac096,
      name: "login"
    }, {
      path: "/register",
      component: _f80ac096,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _48f856f5,
      name: "profile"
    }, {
      path: "/settings/",
      component: _67529857,
      name: "settings"
    }, {
      path: "/editor/",
      component: _22650abe,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _2fc29a42,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}

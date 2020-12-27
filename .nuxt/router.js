import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8935a86c = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _24626502 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _6779aa6e = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _bd6b25ee = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _194344c3 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _a0d35be6 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _efd69f54 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _8935a86c,
    children: [{
      path: "/",
      component: _24626502,
      name: "home"
    }, {
      path: "/login",
      component: _6779aa6e,
      name: "login"
    }, {
      path: "/register",
      component: _6779aa6e,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _bd6b25ee,
      name: "profile"
    }, {
      path: "/settings/",
      component: _194344c3,
      name: "settings"
    }, {
      path: "/editor/",
      component: _a0d35be6,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _efd69f54,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}

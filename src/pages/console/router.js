import Vue from 'vue'
import Router from 'vue-router'
import Cookie from 'js-cookie'
import { Message } from 'element-ui'
import store from './store.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/console',
      name: 'Console',
      redirect: '/console',
      component: () => import('./components/Layout.vue'),
      children: [
        {
          path: '',
          name: 'Dashboard',
          meta: { hidden: true },
          component: () => import('./views/Dashboard.vue')
        },
        {
          path: 'example',
          name: 'Example',
          meta: { icon: 'example' },
          redirect: 'example/tree',
          component: () => import('./views/Example.vue'),
          children: [
            {
              path: 'tree',
              name: 'Tree',
              meta: { icon: 'tree' },
              component: () => import('./views/ExampleTree.vue')
            }
          ]
        },
        {
          path: 'form',
          name: 'Form',
          meta: { icon: 'form' },
          component: () => import('./views/Form.vue')
        }
      ],
      beforeEnter: (to, from, next) => {
        if (Cookie.get('ACCESS_TOKEN')) {
          if (store.state.rules.length === 0) {
            store.dispatch('getInfo').then(() => {
              next()
            }).catch(() => {
              next({ path: '/login?redirect=' + to.path })
            })
          } else {
            next()
          }
        } else {
          next({ path: '/login?redirect=' + to.path })
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue'),
      beforeEnter: (to, from, next) => {
        if (Cookie.get('ACCESS_TOKEN')) {
          if (store.state.rules.length === 0) {
            store.dispatch('getInfo').then(() => {
              next({ name: 'Console' })
              Message.error('您已登录')
            }).catch(() => {
              next()
            })
          } else {
            next({ name: from.name })
            Message.error('您已登录')
          }
        } else {
          next()
        }
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { y: 0 }
  }
})

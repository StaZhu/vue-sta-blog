import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/article/:title',
      name: 'Article',
      meta: { title: 'formatting-context-and-block-formatting-context' },
      component: () => import('./views/Article.vue')
    },
    {
      path: '/photo',
      name: 'Photo',
      component: () => import('./views/Photo.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('./views/Contact.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router

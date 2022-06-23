import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user/:id',
    name: 'Timeline',
    component: () => import('../views/Timeline.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/birthday',
    name: 'Birthday',
    component: () => import('../views/Birthday.vue')
  },
  {
    path: '*',
    redirect: { name: 'Home' }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user/:id',
    name: 'Timeline',
    component: () => import('../components/TheTimeline.vue')
  },
  {
    path: '*',
    redirect: { name: 'Timeline' }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/home/chat',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/Home/Index'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

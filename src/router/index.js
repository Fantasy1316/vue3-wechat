import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    component: () => import('../views/Home/Index'),
    children: [
      {
        path: 'chat',
        meta: {
          title: '微信',
        },
        component: () => import('../views/Chat/Index'),
        children: [
          {
            path: ':id',
            component: () => import('../views/Chat/Detail'),
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('@/views/article')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('@/views/message')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/home/components/user.vue')
  },
  {
    path: '/article/:id',
    name: 'ArticleId',
    component: () => import('@/views/article/components/article-id.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/components/ttxbb-admin.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//路由跳转后，页面回到顶部
router.afterEach(() => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})


export default router

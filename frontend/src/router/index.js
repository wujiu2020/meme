import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreateToken from '../components/CreateToken.vue'
import SwapPage from '../components/SwapPage.vue'
import TokenDetailPage from '../views/TokenDetailPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'CreateToken',
    component: CreateToken
  },
  {
    path: '/swap',
    name: 'SwapPage',
    component: SwapPage
  },
  {
    path: '/token/:token',
    name: 'TokenDetail',
    component: TokenDetailPage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
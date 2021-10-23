import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'
import Index from '@/pages/Index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: Index,
  },
]

export default createRouter({
  routes,
  history: createWebHistory(),
})

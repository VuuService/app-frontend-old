import { RouteName } from '@/enums/RouteName'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.home,
    component: () => import('@/layouts/MainLayout.vue')
  },
  {
    path: '/account',
    name: RouteName.account,
    component: () => import('@/views/account/AccountIndex.vue')
  },
  {
    path: '/customers',
    name: RouteName.customers,
    component: () => import('@/views/account/AccountIndex.vue')
  },
  {
    path: '/users/create',
    name: RouteName.users_create,
    component: () => import('../views/users/UserCreate.vue')
  },
  {
    path: '/users',
    name: RouteName.users,
    component: () => import('@/views/users/UsersIndex.vue')
  }
]
export default routes

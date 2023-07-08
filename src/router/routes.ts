import { RouteRecordRaw } from 'vue-router'
import { RouteName } from '@/enums/RouteName'

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
    path: '/users',
    name: RouteName.users,
    component: () => import('@/views/users/UsersIndex.vue')
  }
]
export default routes

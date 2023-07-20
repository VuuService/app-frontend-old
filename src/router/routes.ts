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
  },
  {
    path: '/roles',
    name: RouteName.roles,
    component: () => import('@/views/roles/RolesIndex.vue')
  },
  {
    path: '/roles/create',
    name: RouteName.roles_create,
    component: () => import('@/views/roles/RolesCreate.vue')
  },
  {
    path: '/stocks',
    name: RouteName.stocks,
    component: () => import('@/views/stocks/StocksIndex.vue')
  }
]
export default routes

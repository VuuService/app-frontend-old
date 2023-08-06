import { RouteName } from '@/enums/RouteName'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.home,
    children: [
      {
        path: '/account',
        name: RouteName.account,
        component: () => import('@/views/account/AccountIndex.vue')
      },
      {
        path: '/customers',
        name: RouteName.customers,
        component: () => import('@/views/customers/CustomersIndex.vue')
      },
      {
        path: '/customers/create',
        name: RouteName.customers_create,
        component: () => import('@/views/customers/CustomersCreate.vue')
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
        path: '/roles/edit/:name/:id',
        name: RouteName.roles_update,
        component: () => import('@/views/roles/RolesEdit.vue')
      },
      {
        path: '/stocks',
        name: RouteName.stocks,
        component: () => import('@/views/stocks/StocksIndex.vue')
      },
      {
        path: '/stocks/create',
        name: RouteName.stocks_create,
        component: () => import('@/views/stocks/StocksCreate.vue')
      },
      {
        path: '/stocks_definitions',
        name: RouteName.stocks_definitions,
        component: () => import('@/views/stocks/StocksDefinitionsIndex.vue')
      },
      {
        path: '/stocks_definitions/create',
        name: RouteName.stocks_definitions_create,
        component: () => import('@/views/stocks/StocksDefinitionsCreate.vue')
      },
      {
        path: '/definitions',
        name: RouteName.definitions,
        props: true,
        component: () => import('@/views/definitions/DefinitionsIndex.vue')
      },
      {
        path: '/definitions/create',
        name: RouteName.definitions_create,
        component: () => import('@/views/definitions/DefinitionsCreate.vue')
      },
      {
        path: '/company/create',
        name: RouteName.company_create,
        component: () => import('@/views/company/CreateCompany.vue')
      }
    ]
  },
  {
    path: '/login',
    name: RouteName.login,
    component: () => import('@/views/auth/LoginView.vue')
  },
  {
    path: '/register',
    name: RouteName.register,
    component: () => import('@/views/auth/RegisterView.vue')
  }
]

export default routes

import { RouteName } from '@/enums/RouteName'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.home,
    children: [
      {
        path: '/dashboard',
        name: RouteName.home,
        component: () => import('@/views/AboutView.vue')
      },
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
        path: '/customers/edit/:fullname/:id',
        name: RouteName.customers_update,
        component: () => import('@/views/customers/CustomersEdit.vue')
      },
      {
        path: '/customers/selling_device',
        name: RouteName.customers_selling_device,
        component: () => import('@/views/customers/CustomerDeviceSelling.vue')
      },
      {
        path: '/customers/:fullName/:id/',
        name: RouteName.customers_details,
        component: () => import('@/views/customers/CustomerDetails.vue')
      },
      {
        path: '/customers/:fullName/:id/maintenance_device',
        name: RouteName.customers_maintenance_device,
        component: () => import('@/views/customers/CustomerMaintenanceDevice.vue')
      },
      {
        path: '/devices/:fullName/:id/create',
        name: RouteName.devices_create,
        component: () => import('@/views/devices/CreateDevice.vue')
      },
      {
        path: '/users/create',
        name: RouteName.users_create,
        component: () => import('../views/users/UserCreate.vue')
      },
      {
        path: '/users/:fullname/:id',
        name: RouteName.users_view,
        component: () => import('../views/users/UserProfile.vue')
      },
      {
        path: '/users/edit/:fullname/:id',
        name: RouteName.users_update,
        component: () => import('../views/users/UserEdit.vue')
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
        path: '/stocks/edit/:name/:id',
        name: RouteName.stocks_update,
        component: () => import('@/views/stocks/StocksEdit.vue')
      },
      {
        path: '/definitions/:module',
        name: RouteName.definitions,
        props: true,
        component: () => import('@/views/definitions/DefinitionsIndex.vue')
      },
      {
        path: '/definitions/:module/create',
        name: RouteName.definitions_create,
        component: () => import('@/views/definitions/DefinitionsCreate.vue')
      },
      {
        path: '/definitions/:module/edit/:id',
        name: RouteName.definitions_update,
        component: () => import('@/views/definitions/DefinitionsEdit.vue')
      },
      {
        path: '/company/create',
        name: RouteName.company_create,
        component: () => import('@/views/company/CreateCompany.vue')
      },
      {
        path: '/payment',
        component: () => import('@/views/payment/PaymentIndex.vue')
      }
    ]
  },
  {
    path: '/login',
    name: RouteName.login,
    component: () => import('@/views/auth/LoginView.vue')
  },
  {
    path: '/register/:reference',
    name: RouteName.register,
    component: () => import('@/views/auth/RegisterView.vue')
  }
]

export default routes

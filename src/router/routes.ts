import { RouteRecordRaw } from 'vue-router'
import { RouterName } from '@/enums/RouteName'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouterName.home,
    component: () => import('@/layouts/MainLayout.vue')
  }
]
export default routes

import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import { userStore } from '@/stores/AuthStore'
import AppAxios from '@/utils/AppAxios'
import { RouteName } from '@/enums/RouteName'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
  const user = userStore()
  const publicPages = ['/login', '/register', '/forgot-password']
  const authpage = !publicPages.includes(routeTo.path)
  const loginpage = publicPages.includes(routeTo.path)
  const loggeduser = user.isAuth

  if (authpage && !loggeduser) {
    return next('/login')
  }
  if (loggeduser) {
    AppAxios.defaults.headers['Authorization'] = 'Bearer ' + user.getAccessToken
  }
  if (loginpage && loggeduser) {
    router.push('/')
  }
  if (loggeduser && !user.company && routeTo.path != '/company/create') {
    router.push({ name: RouteName.company_create })
  }
  return next()
})
export default router

import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import AppAxios from '@/utils/AppAxios'
import type { AxiosResponse } from 'axios'
import type { UserInterface } from '@/api/UserApi'
import { userData } from '@/api/UserApi'
import router from '@/router'
import { RouteName } from '@/enums/RouteName'

export const userStore = defineStore('user', () => {
  const User = localStorage.getItem('user')
    ? reactive<{ value: UserInterface }>({
        value: JSON.parse(localStorage.getItem('user') as string) as UserInterface
      })
    : reactive<{ value: UserInterface }>({ value: userData })
  const isAuth = computed(() => User.value.token?.accessToken != null)
  const getAccessToken = computed(() => User.value.token?.accessToken)
  const user = computed((): UserInterface => User.value)
  const permissions = computed(() => User.value.permissions)
  const company = computed(() => User.value.company)
  const exp = computed(() => User.value.exp)

  async function login(data: any) {
    return await AppAxios.post('/login', data)
      .then((r: AxiosResponse<UserInterface>) => {
        User.value = r.data
        localStorage.setItem('user', JSON.stringify(r.data))
        return { success: true }
      })
      .catch((e) => {
        console.log(e)
        return { success: false }
      })
  }

  async function register(data: any) {
    const key = data.key
    delete data.key
    delete data.exp
    return await AppAxios.post('/users/register/' + key, data)
      .then((r: AxiosResponse<UserInterface>) => {
        User.value = r.data
        localStorage.setItem('user', JSON.stringify(r.data))
        return { success: true }
      })
      .catch((e) => {
        console.log(e)
        return { success: false }
      })
  }

  async function logout() {
    localStorage.removeItem('user')
    User.value = userData
    await router.push({ name: RouteName.login })
  }

  function updateUser(data: UserInterface) {
    User.value = data
    localStorage.setItem('user', JSON.stringify(data))
  }

  return {
    user,
    isAuth,
    login,
    register,
    getAccessToken,
    permissions,
    company,
    updateUser,
    logout,
    exp
  }
})

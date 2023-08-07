import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import AppAxios from '@/utils/AppAxios'
import type { AxiosResponse } from 'axios'
import type { UserInterface } from '@/api/UserApi'
import router from '@/router'

export const userStore = defineStore('user', () => {
  const state = localStorage.getItem('user')
    ? ref(JSON.parse(localStorage.getItem('user') as string))
    : ref()
  const isAuth = computed(() => state.value?.token?.access_token != null)
  const getAccessToken = computed(() => state.value?.token?.access_token)
  const user = computed((): UserInterface => state.value)
  const permissions = computed(() => state.value.permissions)
  const company = computed(() => state.value?.company)

  async function login(data: any) {
    return await AppAxios.post('/users/login', data)
      .then((r: AxiosResponse<UserInterface>) => {
        state.value = r.data
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
    state.value = null
    router.go('/login')
  }

  function updateUser(data: UserInterface) {
    state.value = data
    localStorage.setItem('user', JSON.stringify(data))
  }

  return { user, isAuth, login, getAccessToken, permissions, company, updateUser, logout }
})

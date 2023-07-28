import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { GetProfileFn, LoginFn } from '@/api/authApi'
import { api } from '@/api/backendService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref({})
  const token = ref(localStorage.getItem('token'))
  const isAuth = computed(() => !user.value)

  async function login(LoginData: any) {
    const bearer = await LoginFn(LoginData)

    if (bearer != null) {
      if (bearer.error) {
        console.log(bearer.error)
        return { isError: true, msg: bearer.error }
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${bearer.access_token}`
      localStorage.setItem('token', bearer.access_token)

      await getProfile()

      return { isError: false, msg: 'Giriş başarılı.' }
    }

    return { isError: true, msg: 'Giriş yaparken bir hata oluştu.' }
  }

  function logout() {
    localStorage.removeItem('token')
  }

  async function getProfile() {
    user.value = await GetProfileFn()
  }

  function register() {}

  return { user, isAuth, login, logout, register, getProfile }
})

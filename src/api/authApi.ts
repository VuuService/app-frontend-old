import type { AxiosResponse, AxiosError } from 'axios'
import { api } from '@/api/backendService'
import { useRoute, useRouter } from 'vue-router'

export const LoginFn = async (user: any) => {
  try {
    const res: AxiosResponse = await api.post('auth/login', user)

    if (res.status === 201) {
      return res.data
    }

    return null
  } catch (error: any) {
    if (error.response?.status === 401) {
      return { error: 'Kullanıcı adı veya şifre yanlış. Lütfen tekrar deneyin.' }
    }

    return null
  }
}

export const RegisterFn = async (user: any) => {}

export const GetProfileFn = async () => {
  try {
    const res: AxiosResponse = await api.get('admin/profile')

    if (res.status === 200) {
      return res.data
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      return { error: 'Kullanıcı bulunamadı' }
    }

    return null
  }
}

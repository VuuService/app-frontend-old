import type { AxiosResponse } from 'axios'
import { api } from '@/api/backendService'
import { useAuthStore } from '@/stores/AuthStore'

export const GetDefinitionsFn = async (module: any) => {
  try {
    const authStore = await useAuthStore()
    const user = await authStore.getProfile()
    const data = {
      module: module,
      user: user.id
    }

    const res: AxiosResponse = await api.post('defination/findModuleAndCompany', data)
    if (res.status === 201) {
      return res.data
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      return { error: 'Tanımlama bulunamadı' }
    }

    return null
  }
}

export const AddDefinitionFn = async (module: any, key: any, type: any) => {
  try {
    const authStore = await useAuthStore()
    const user = await authStore.getProfile()
    const data = {
      module: module,
      key: key,
      type: type,
      user: user.id
    }
    const res: AxiosResponse = await api.post('defination/create', data)
    if (res.status === 201) {
      return res.data
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      return { error: 'Tanımlama eklenemedi' }
    }

    return null
  }
}

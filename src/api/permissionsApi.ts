import type { AxiosResponse } from 'axios'
import { api } from '@/api/backendService'

export const GetPermissionsFn = async () => {
  try {
    const res: AxiosResponse = await api.get('admin/getPermissions')

    if (res.status === 200) {
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

export const GetRolesFn = async () => {
  try {
    const res: AxiosResponse = await api.get('admin/getRoles')

    if (res.status === 200) {
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

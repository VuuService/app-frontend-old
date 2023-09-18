import { userStore } from '@/stores/AuthStore'
import type { CompanyInterface } from '@/api/CompanyApi'
import AppAxios from '@/utils/AppAxios'
import type { AxiosResponse } from 'axios'
import type { DefinitionInterface } from '@/api/DefinitionsApi'

export interface UserInterface {
  _id?: string
  exp: number
  firstName: string | null
  lastName: string | null
  email: string | null
  password?: string | null
  repassword?: string | null
  role: string | null
  title?: string | null
  phone: string | null
  permissions: string[]
  status?: boolean
  properties: DefinitionInterface[]
  token?: {
    accessToken: string
    refreshToken: string
  }
  company: CompanyInterface | null
}

export const userData: UserInterface = {
  exp: Date.now(),
  firstName: null,
  lastName: null,
  email: null,
  role: null,
  phone: null,
  permissions: [],
  company: null,
  properties: []
}

export async function getUsers(): Promise<UserInterface[]> {
  return await AppAxios.get('/users').then((r: AxiosResponse<UserInterface[]>) => r.data)
}

export async function getUser(id: string): Promise<UserInterface> {
  return await AppAxios.get('/users/' + id).then((r: AxiosResponse<UserInterface>) => r.data)
}

export function isGranted(permission: string) {
  const { permissions } = userStore()

  return permissions.includes(permission)
}

export async function updateUser(id: string, user: UserInterface): Promise<UserInterface> {
  return await AppAxios.patch('/users/' + id, user).then(
    (r: AxiosResponse<UserInterface>) => r.data
  )
}

export async function destroyUser(id: string): Promise<any> {
  AppAxios.delete('/users/' + id).then((r: AxiosResponse<any>) => r.data)
}

export function isRole(role: string[]) {
  const { user } = userStore()

  if (user.role) {
    return role.includes(user.role)
  }
  return false
}

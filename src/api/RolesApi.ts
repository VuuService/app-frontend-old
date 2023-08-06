import AppAxios from '@/utils/AppAxios'
import type { CompanyInterface } from '@/api/CompanyApi'
import type { AxiosResponse } from 'axios'

export interface RolesInterface {
  _id: string
  name: string
  permissions: string[]
  company?: CompanyInterface
}

export interface RolesCreateInterface {
  name: string | null
  permissions: string[]
  company?: string | null
}

export async function getRoles(): Promise<RolesInterface[]> {
  return await AppAxios.get('/roles').then(
    (response: AxiosResponse<RolesInterface[]>) => response.data
  )
}

export async function saveRole(role: RolesCreateInterface) {
  return await AppAxios.post('/roles/create', role)
}

export async function getRole(id: string): Promise<RolesInterface> {
  return await AppAxios.get('/roles/edit/' + id).then((r: AxiosResponse<RolesInterface>) => r.data)
}

export async function updateRole(role: RolesInterface): Promise<RolesInterface> {
  return await AppAxios.put('/roles/edit/' + role._id, role)
}

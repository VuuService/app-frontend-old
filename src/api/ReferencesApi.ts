import type { UserInterface } from '@/api/UserApi'
import AppAxios from '@/utils/AppAxios'
import type { AxiosResponse } from 'axios'

export interface CreateReferenceInterface {
  user?: UserInterface
  box?: object
}

export interface ReferenceInterface extends CreateReferenceInterface {
  _id?: string
  key?: string
}

export async function createReference(data: CreateReferenceInterface): Promise<ReferenceInterface> {
  return await AppAxios.post('/references/create', data).then(
    (r: AxiosResponse<ReferenceInterface>) => r.data
  )
}

import AppAxios from '@/utils/AppAxios'
import type { AxiosResponse } from 'axios'
import type { CompanyInterface } from '@/api/CompanyApi'

interface Box {
  permissions: string[]
  title?: string | undefined
  role?: string | null
}

export interface CreateReferenceInterface {
  company: CompanyInterface
  box?: Box
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

import type { UserInterface } from '@/api/UserApi'
import AppAxios from '@/utils/AppAxios'
import type { AxiosResponse } from 'axios'
import { userStore } from '@/stores/AuthStore'

export interface CompanyInterface {
  name: string | null
  phone: string | null
  owner: UserInterface | null | string
}

export async function saveCompany(company: CompanyInterface) {
  return await AppAxios.post('companies/create', company)
    .then((r: AxiosResponse<UserInterface>) => {
      const { updateUser } = userStore()
      updateUser(r.data)

      return { success: true }
    })
    .catch((e) => console.log(e))
}

import AppAxios from '@/utils/AppAxios'
import type { AxiosResponse } from 'axios'
import type { CompanyInterface } from '@/api/CompanyApi'

export interface AddressInterface {
  province: number | string
  district: string | null
  town: string | null
  village: string | null
  neighbourhood: string | null
  coordinate?: {
    latitude: number
    longitude: number
  }
}

export interface CustomerInterface {
  _id: string | null
  firstName: string | null
  lastName: string | null
  phone: string | null
  company: CompanyInterface | null
  properties: []
  address?: AddressInterface
  expireAt?: string | null
}

export const customerData: CustomerInterface = {
  _id: null,
  firstName: null,
  lastName: null,
  phone: null,
  company: null,
  properties: [],
  address: {
    province: 0,
    district: null,
    town: null,
    village: null,
    neighbourhood: null
  }
}

export async function createCustomers(data: any) {
  delete data._id
  return await AppAxios.post('/customers/create', data)
    .then((r: AxiosResponse<CustomerInterface>) => ({ success: true, message: r.data }))
    .catch((e) => ({ success: false, message: e.response.data.error }))
}

export async function getCustomers() {
  return await AppAxios.get('/customers').then((r: AxiosResponse<CustomerInterface[]>) => r.data)
}

export async function getCustomer(id: string) {
  return await AppAxios.get('/customers/edit/' + id).then(
    (r: AxiosResponse<CustomerInterface>) => r.data
  )
}

export async function updateCustomer(data: CustomerInterface) {
  return await AppAxios.put('/customers/edit/' + data._id, data)
    .then((r: AxiosResponse<CustomerInterface>) => ({ success: true, message: r.data }))
    .catch((e) => ({ success: false, message: e.response.data.error }))
}

export async function destroyCustomer(id: string): Promise<any> {
  AppAxios.delete('/customers/destroy/' + id).then((r: AxiosResponse<any>) => r.data)
}

import type { PeriodInterface } from '@/api/StockApi'
import type { DefinitionInterface } from '@/api/DefinitionsApi'
import AppAxios from '@/utils/AppAxios'
import type { AxiosResponse } from 'axios'

export interface DeviceInterface {
  _id?: string
  customer: string | null
  name: string | null
  parts: PartInterface[]
  period: PeriodInterface | null
  properties: DefinitionInterface[]
}

export interface PartInterface {
  period: PeriodInterface | null
  name: string | null
}

export const deviceData: DeviceInterface = {
  name: null,
  period: null,
  properties: [],
  parts: [],
  customer: null
}

export async function createDevices(data: any) {
  delete data._id
  !data.period ? delete data.period : true
  return await AppAxios.post('/devices/create', data)
    .then((r: AxiosResponse<DeviceInterface>) => ({ success: true, message: r.data }))
    .catch((e) => ({ success: false, message: e.response.data.error }))
}

export async function getDevices(customerID: string) {
  return await AppAxios.get('/devices/' + customerID).then(
    (r: AxiosResponse<DeviceInterface[]>) => r.data
  )
}

export async function getDevice(id: string) {
  return await AppAxios.get('/devices/edit/' + id).then(
    (r: AxiosResponse<DeviceInterface>) => r.data
  )
}

export async function updateDevice(data: DeviceInterface) {
  return await AppAxios.put('/devices/edit/' + data._id, data)
    .then((r: AxiosResponse<DeviceInterface>) => ({ success: true, message: r.data }))
    .catch((e) => ({ success: false, message: e.response.data.error }))
}

export async function getParts() {
  return await AppAxios.post('/devices/search', { primary: false }).then(
    (r: AxiosResponse<DeviceInterface[]>) => r.data
  )
}

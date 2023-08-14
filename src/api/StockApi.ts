import AppAxios from '@/utils/AppAxios'
import type { AxiosResponse } from 'axios'

export interface PriceInterface {
  price: number | null
  name: string | null
  tax_rate: number | null
  currency: string | null
}

export interface StockInterface {
  _id?: string
  name: string
  quantity: number | null
  unit: string
  purchasePrices: PriceInterface[]
  sellingPrices: PriceInterface[]
  status: boolean
  properties: []
  company: string
  unlimited: boolean
  primary: boolean
  child?: string[]
  period: number | null
}

export const stockData: StockInterface = {
  _id: '',
  name: '',
  quantity: null,
  unit: 'Adet',
  purchasePrices: [],
  sellingPrices: [],
  status: false,
  properties: [],
  company: '',
  unlimited: false,
  primary: true,
  period: null
}

export async function createStocks(data: any) {
  delete data._id
  !data.period ? delete data.period : true
  return await AppAxios.post('/stocks/create', data)
    .then((r: AxiosResponse<StockInterface>) => ({ success: true, message: r.data }))
    .catch((e) => ({ success: false, message: e.response.data.error }))
}

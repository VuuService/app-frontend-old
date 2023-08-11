import { ref } from 'vue'
import AppAxios from '@/utils/AppAxios'
import type { AxiosResponse } from 'axios'

export interface DefinitionInterface {
  _id?: string
  key: string
  value?: any
  type: string
  company?: string
  module: string
  static?: boolean
}

export const definition = ref<DefinitionInterface>({
  key: '',
  type: '',
  company: '',
  module: '',
  static: false
})

export async function getDefinitions(module: string): Promise<DefinitionInterface[]> {
  return await AppAxios.get('/definitions/' + module).then(
    (r: AxiosResponse<DefinitionInterface[]>) => r.data
  )
}

export async function createDefinition(
  data: DefinitionInterface
): Promise<{ success: boolean; message: any }> {
  return await AppAxios.post('/definitions/create', data)
    .then((r) => ({ success: true, message: r.data }))
    .catch((e) => ({ success: false, message: e.response.data.error }))
}

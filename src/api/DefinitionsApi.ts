import { ref } from 'vue'
import AppAxios from '@/utils/AppAxios'
import type { AxiosResponse } from 'axios'

export interface DefinitionInterface {
  _id: string
  key: string
  type: string
  company: string
  module: string
  static: boolean
}

export const definitions = ref<DefinitionInterface>({
  _id: '',
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

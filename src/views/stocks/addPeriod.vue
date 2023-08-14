<template>
  <button
    v-if="add && props.modelValue == null"
    class="mt-4 w-full py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    type="button"
    @click="add = false"
  >
    <i class="vuu-plus"></i>
    Periyot ekle
  </button>
  <div v-else class="grid grid-cols-2">
    <input-view v-model="model" placeholder="Periyot süresi" type="number"></input-view>
    <underline-select v-model="dateType" placeholder="Periyot Aralığı">
      <option v-for="item in ['Saat', 'Gün', 'Hafta', 'Ay', 'Yıl']" :key="item" :value="item">
        {{ item }}
      </option>
    </underline-select>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import InputView from '@/components/InputView.vue'
import UnderlineSelect from '@/components/UnderlineSelect.vue'

const add = ref<boolean>(true)
const dateType = ref<string>('Gün')

interface Props {
  modelValue: number | null
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    let value = props.modelValue
    if (value != null) {
      switch (dateType.value) {
        case 'Saat':
          value *= 24
          break
        case 'Hafta':
          value = value / 7
          break
        case 'Ay':
          value = value / 30
          break
        case 'Yıl':
          value = value / 365
          break
        default:
      }
    }

    return !['Gün', 'Saat'].includes(dateType.value) ? value?.toFixed(1) : value
  },
  set(value) {
    if (value != null) {
      let v = parseFloat(value.toString())
      switch (dateType.value) {
        case 'Saat':
          v = v / 24
          break
        case 'Hafta':
          v *= 7
          break
        case 'Ay':
          v *= 30
          break
        case 'Yıl':
          v *= 365
          break
      }
      return emit('update:modelValue', v)
    }
    return
  }
})
</script>

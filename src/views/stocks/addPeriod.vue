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
    <input-view
      v-model="model"
      pattern="[0-9]+([,.][0-9]{1,2})?"
      placeholder="Periyot süresi"
      type="text"
      v-on:focusout="valid()"
    ></input-view>
    <underline-select v-model="dateType" placeholder="Periyot Aralığı">
      <option v-for="item in ['Saat', 'Gün', 'Hafta', 'Ay', 'Yıl']" :key="item" :value="item">
        {{ item }}
      </option>
    </underline-select>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import InputView from '@/components/InputView.vue'
import UnderlineSelect from '@/components/UnderlineSelect.vue'

const add = ref<boolean>(true)
const dateType = ref<string>('Gün')

const valid = () => {
  model.value = model.value.toString().replace(',', '.')
}

interface Props {
  modelValue: any
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    return emit('update:modelValue', value)
  }
})

function newValueSet(value: number) {
  let v = value
  switch (dateType.value) {
    case 'Saat':
      v = v * 24
      break
    case 'Hafta':
      v /= 7
      break
    case 'Ay':
      v /= 30
      break
    case 'Yıl':
      v /= 365
      break
  }
  console.log(v)
  model.value = v.toFixed(1).toString()
}

watch(dateType, (value, oldValue) => {
  let v = parseFloat(model.value)
  switch (oldValue) {
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
  newValueSet(v)
})
</script>
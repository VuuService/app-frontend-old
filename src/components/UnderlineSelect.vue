<template>
  <div class="relative z-0 mt-4 group">
    <select
      :id="id"
      v-model="model"
      :disabled="disabled"
      :required="required"
      class="block pt-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      style="appearance: none"
    >
      <slot></slot>
    </select>
    <label
      :for="id"
      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >{{ placeholder }}</label
    >
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { randomInt } from '@/utils/math'

const id = ref<string>('input' + randomInt(1, 9999 * 9999))

export interface Props {
  placeholder?: string
  required?: boolean
  modelValue?: any
  value?: any[]
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  required: false
})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    return emit('update:modelValue', value)
  }
})
</script>

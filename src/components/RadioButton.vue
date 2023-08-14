<template>
  <div class="flex items-center">
    <input
      :id="'default-radio-' + id"
      v-model="model"
      :disabled="disabled"
      :value="value"
      checked
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      name="default-radio"
      type="radio"
    />
    <label
      :for="'default-radio-' + id"
      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ placeholder }}</label
    >
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { randomInt } from '@/utils/math'

const id = ref<number>(randomInt(1, 9999 * 9999))

export interface Props {
  placeholder?: string
  modelValue?: any
  value?: any
  disabled?: boolean
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
</script>

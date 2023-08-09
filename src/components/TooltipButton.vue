<template>
  <button
    :id="'tooltipButton' + id"
    class="flex items-center px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 border-l border-gray-200 dark:border-gray-600 dark:text-gray-400 dark:bg-gray-800 hover:text-blue-700 dark:hover:text-white copy-to-clipboard-button"
    type="button"
    @click="tooltip?.show()"
  >
    <slot name="ButtonText"></slot>
  </button>
  <div
    :id="'tooltipContent' + id"
    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
    role="tooltip"
  >
    {{ props.tooltipText }}
    <div class="tooltip-arrow" data-popper-arrow></div>
  </div>
</template>
<script lang="ts" setup>
import type { TooltipInterface, TooltipOptions } from 'flowbite'
import { Tooltip } from 'flowbite'
import { onMounted, ref } from 'vue'
import { randomInt } from '@/utils/math'

const props = withDefaults(defineProps<any>(), {
  tooltipText: undefined,
  options: {
    placement: 'auto',
    triggerType: 'hover'
  }
})
const id = ref<number>(randomInt(1, 9999 * 9999))
const targetEl = ref<HTMLElement>()
const triggerEl = ref<HTMLElement>()
const tooltip = ref<TooltipInterface>()

const emit = defineEmits(['tooltip'])
emit('tooltip', tooltip.value)

onMounted(() => {
  let options: TooltipOptions = {
    ...props.options
  }
  if (!options.onShow) {
    options.onShow = () => {
      setTimeout(() => {
        tooltip.value?.hide()
      }, 5000)
    }
  }

  targetEl.value = document.getElementById('tooltipContent' + id.value) || undefined
  triggerEl.value = document.getElementById('tooltipButton' + id.value) || undefined
  tooltip.value = new Tooltip(targetEl.value, triggerEl.value, options)
})
</script>

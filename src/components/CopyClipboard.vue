<template>
  <div class="relative border-gray-200 border-y border-x code-syntax dark:border-gray-600">
    <div
      class="w-full flex border-b border-gray-200 bg-gray-50 rounded-t-md dark:bg-gray-700 dark:border-gray-600"
    >
      <div id="copyContent" class="overflow-x-auto w-full">
        <slot></slot>
      </div>
      <div>
        <a href="whatsapp://">
          <tooltip-button tooltip-text="Whatsapp">
            <template #ButtonText>Whatsapp</template>
          </tooltip-button>
        </a>
      </div>
      <div>
        <tooltip-button
          :options="options"
          tooltip-text="Kopyalandı"
          @tooltip="(v) => (tooltip = v)"
        >
          <template #ButtonText>Kopyala</template>
        </tooltip-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { TooltipOptions } from 'flowbite'

import TooltipButton from '@/components/TooltipButton.vue'
import { ref } from 'vue'

const tooltip = ref()
const options: TooltipOptions = {
  placement: 'bottom',
  triggerType: 'click',
  onShow: () => {
    setTimeout(() => {
      tooltip.value?.hide()
    }, 5000)
    navigator.clipboard.writeText(document.getElementById('copyContent').innerText)
  }
}
</script>
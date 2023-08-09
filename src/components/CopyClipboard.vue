<template>
  <div class="relative border-gray-200 border-y border-x code-syntax dark:border-gray-600">
    <div
      class="w-full flex border-b border-gray-200 bg-gray-50 rounded-t-md dark:bg-gray-700 dark:border-gray-600"
    >
      <div id="copyContent" class="overflow-x-auto w-full">
        {{ props.value }}
      </div>
    </div>
    <div class="flex justify-between">
      <div>
        <a
          :href="
            (isMobile() ? 'whatsapp://' : 'https://web.whatsapp.com/') +
            'send?text=' +
            encodeURIComponent(props.value)
          "
          target="_blank"
        >
          <tooltip-button tooltip-text="Whatsapp">
            <template #ButtonText><i class="vuu-whatsapp text-lg">Whatsapp</i></template>
          </tooltip-button>
        </a>
      </div>
      <div>
        <tooltip-button
          :options="options"
          tooltip-text="Kopyalandı"
          @tooltip="(v) => (tooltip = v)"
        >
          <template #ButtonText><i class="vuu-copy text-lg">Kopyala</i></template>
        </tooltip-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { TooltipOptions } from 'flowbite'

import TooltipButton from '@/components/TooltipButton.vue'
import { ref } from 'vue'
import { isMobile } from '@/api/BrowserApi'

const props = withDefaults(defineProps<{ value: string }>(), {})
const tooltip = ref()
const options: TooltipOptions = {
  placement: 'bottom',
  triggerType: 'click',
  onShow: () => {
    setTimeout(() => {
      tooltip.value?.hide()
    }, 5000)
    const clipboard = document.getElementById('copyContent')?.innerText
    if (clipboard) {
      navigator.clipboard.writeText(clipboard)
    }
  }
}
</script>

<template>
  <teleport to="body">
    <div
      :id="'staticModal' + id"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      tabindex="-1"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
            <slot name="header"></slot>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <slot></slot>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts" setup>
import type { ModalInterface, ModalOptions } from 'flowbite'
import { Modal } from 'flowbite'
import { onMounted, ref } from 'vue'
import { randomInt } from '@/utils/math'

const emit = defineEmits(['modal'])
const id = ref<number>(randomInt(1, 999 * 999))
const staticModalElement = ref<HTMLElement>()
const modal = ref<ModalInterface>()
onMounted(() => {
  const modalOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'static',
    backdropClasses: 'bg-gray-600 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: false
  }
  staticModalElement.value = document.getElementById('staticModal' + id.value)
  modal.value = new Modal(staticModalElement.value, modalOptions)
  emit('modal', modal.value)
})
</script>

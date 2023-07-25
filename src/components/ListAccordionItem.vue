<template>
  <li>
    <input id="published" v-model="checked" class="hidden" name="status" type="checkbox" />
    <label class="flex items-center space-x-4 cursor-pointer py-3 sm:py-4 px-4" for="published">
      <div class="flex-shrink-0">
        <slot name="left"></slot>
      </div>
      <div class="flex-1 min-w-0">
        <slot name="middle"></slot>
      </div>
      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
        <i :class="{ 'rotate-90': checked }" class="vuu-right-arrow text-xl transition-all"></i>
      </div>
    </label>
    <div :class="{ hidden: !checked }" class="block transition delay-500 px-4">
      <slot name="content"></slot>
    </div>
  </li>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    rotate?: number
  }>(),
  {
    rotate: 90
  }
)
//TODO Yukarıdaki propsun şu anda bir işlevi yok. tailwindde kullanılmayan cssler import edilmediği için yapılmak istenilen başarılı olamayacak gibi. İleriki süreçte tekrardan bakacağız.
//TODO transition ve delay çalışmıyor onlara da bakılacak.

const checked = ref<boolean>()
</script>
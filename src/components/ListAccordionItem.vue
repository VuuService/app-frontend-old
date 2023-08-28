<template>
  <li
    :class="{
      border: checked,
      'border-2': checked,
      'border-gray-100': checked,
      'bg-zinc-50': checked
    }"
    class="mx-2 -px-2 rounded-2xl py-4"
  >
    <input v-model="checked" class="hidden" name="status" type="checkbox" />
    <div
      :class="{ 'border-b-2': checked, 'pb-2': checked, 'mb-2': checked }"
      class="flex items-center space-x-4 cursor-pointer sm:py-4 px-2 border-gray-100"
    >
      <div class="flex-shrink-0">
        <slot name="left"></slot>
      </div>
      <div class="flex-1 min-w-0" @click="checked = !checked">
        <slot name="middle"></slot>
      </div>
      <div
        v-if="props.arrow"
        class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
      >
        <i :class="{ 'rotate-90': checked }" class="vuu-right-arrow text-xl transition-all"></i>
      </div>
      <div v-else>
        <slot name="end"></slot>
      </div>
    </div>
    <div :class="{ hidden: !checked }" class="block transition delay-500 px-4">
      <slot name="content"></slot>
    </div>
  </li>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
  arrow?: boolean
}

const props = withDefaults(defineProps<Props>(), { arrow: false })

//TODO Yukarıdaki propsun şu anda bir işlevi yok. tailwindde kullanılmayan cssler import edilmediği için yapılmak istenilen başarılı olamayacak gibi. İleriki süreçte tekrardan bakacağız.
//TODO transition ve delay çalışmıyor onlara da bakılacak.

const checked = ref<boolean>()
</script>

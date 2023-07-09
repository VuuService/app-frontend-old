<script lang="ts" setup>
import { ref } from 'vue'
import { RouteName } from '@/enums/RouteName'

interface menuItemInterface {
  icon: string
  name: string
  url: string
}

const menuItems = ref<menuItemInterface[]>([
  { icon: 'vuu-home', name: 'Anasayfa', url: RouteName.home },
  { icon: 'vuu-account-group', name: 'Müşteriler', url: RouteName.customers },
  { icon: 'vuu-account', name: 'Hesabım', url: RouteName.account }
])
</script>
<template>
  <div
    class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 md:hidden"
  >
    <div class="flex justify-between font-medium">
      <div v-for="menuItem in menuItems" :key="menuItem.icon">
        <router-link
          :to="{ name: menuItem.url }"
          class="inline-flex text-center flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          type="button"
        >
          <i
            :class="menuItem.icon"
            class="text-3xl text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
          ></i>
          <span
            class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            >{{ menuItem.name }}</span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>
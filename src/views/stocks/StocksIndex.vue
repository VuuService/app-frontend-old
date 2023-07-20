<template>
  <breadcrumb-view></breadcrumb-view>
  <div class="w-full shadow">
    <div class="flex w-full p-2 px-4 justify-between shadow">
      <div class="relative pr-2">
        <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          <i
            aria-hidden="true"
            class="vuu-search text-2xl text-gray-500 dark:text-gray-400"
            fill="none"
          >
          </i>
        </div>
        <input
          class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Arama"
          required
          type="search"
        />
      </div>
      <div class="flex items-center">
        <button
          class="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          «
        </button>
        <select
          class="block py-2 mx-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option v-for="i in 5" :key="i" :value="i">{{ i }}</option>
        </select>
        <button
          class="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          »
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import BreadcrumbView from '@/components/BreadcrumbView.vue'
</script>
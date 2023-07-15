<template>
  <breadcrumb-view></breadcrumb-view>
  <form class="px-4 py-4">
    <div class="relative z-0 w-full mb-6 group">
      <input
        id="floating_email"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        name="floating_email"
        placeholder=" "
        required
        type="email"
      />
      <label
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        for="floating_email"
        >Görev adı</label
      >
    </div>
    <div
      v-for="i in 5"
      :key="i"
      class="block max-w-sm p-3 mb-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Modül Adı</h5>
      <div class="grid grid-cols-2 gap-2">
        <label v-for="i in 5" :key="i" class="flex justify-between items-center">
          <div class="relative inline-flex items-center cursor-pointer">
            <input class="sr-only peer" type="checkbox" value="" />
            <div
              class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>
          </div>
          <div class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Modül Tanımı {{ i }}
          </div>
        </label>
      </div>
    </div>

    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="submit"
    >
      Submit
    </button>
  </form>
</template>
<script lang="ts" setup>
import BreadcrumbView from '@/components/BreadcrumbView.vue'
</script>
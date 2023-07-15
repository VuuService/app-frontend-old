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

    <div>
      <ul role="list">
        <li>
          <router-link
            v-if="permission"
            :to="{ name: RouteName.users_create }"
            class="flex items-center space-x-4 cursor-pointer py-3 sm:py-4 px-4"
          >
            <div class="flex-shrink-0">
              <div
                class="bg-gray-100 rounded-full h-12 w-12 overflow-hidden flex items-center justify-center"
              >
                <i class="vuu-account-plus text-4xl m-0 before:!m-0"></i>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                Yeni Personel Oluştur
              </p>
            </div>
            <div
              class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
            >
              <button
                class="text-gray-400 hover:bg-gray-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
              >
                <i class="vuu-right-arrow text-xl"></i>
                <span class="sr-only">Icon description</span>
              </button>
            </div>
          </router-link>
        </li>

        <li v-for="i in 4" :key="i">
          <router-link
            class="flex items-center space-x-4 cursor-pointer py-3 sm:py-4 px-4"
            to="/account"
          >
            <div class="flex-shrink-0">
              <img
                alt="Neil image"
                class="w-12 h-12 rounded-full"
                src="https://picsum.photos/seed/picsum/200/300"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Neil Sims</p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">Muhasebeci</p>
            </div>
            <div
              class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
            >
              <button
                class="text-gray-400 hover:bg-gray-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
              >
                <i class="vuu-right-arrow text-xl"></i>
                <span class="sr-only">Icon description</span>
              </button>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-2 p-2">
    <router-link
      :to="{ name: RouteName.roles }"
      class="inline-flex items-center p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      href="#"
    >
      <i class="vuu-account-outline text-2xl"></i>
      <h5 class="font-bold tracking-tight text-gray-900 dark:text-white">Görev Tanımları</h5>
    </router-link>
  </div>
</template>
<script lang="ts" setup>
import { RouteName } from '@/enums/RouteName'
import BreadcrumbView from '@/components/BreadcrumbView.vue'
import { ref } from 'vue'

const permission = ref(true)
</script>
<template>
  <breadcrumb-view></breadcrumb-view>
  <div class="w-full shadow">
    <div class="flex w-full p-2 px-4 justify-between shadow">
      <div class="relative pr-2">
        <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          <i aria-hidden="true" class="vuu-search text-2xl text-gray-500 dark:text-gray-400"> </i>
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
            v-if="isGranted(PermissionName.roles_create)"
            :to="{ name: RouteName.roles_create }"
            class="flex items-center space-x-4 cursor-pointer py-3 sm:py-4 px-4"
          >
            <div class="flex-shrink-0">
              <div
                class="relative bg-gray-100 rounded-full h-12 w-12 overflow-hidden flex items-center justify-center"
              >
                <i class="vuu-account-tie text-gray-400 text-4xl m-0 before:!m-0"></i>
                <i class="vuu-plus absolute text-2xl -right-1.5 top-1"></i>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium break-words text-gray-900 truncate dark:text-white">
                Yeni Görev Tanımı Oluştur
              </p>
            </div>
            <div
              class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
            >
              <i class="vuu-right-arrow text-xl"></i>
            </div>
          </router-link>
        </li>

        <li v-for="role in roles" :key="role">
          <router-link
            :to="{ name: RouteName.roles_update, params: { name: role.name, id: role._id } }"
            class="flex items-center space-x-4 cursor-pointer py-3 sm:py-4 px-4"
          >
            <div class="flex-shrink-0">
              <div
                class="bg-gray-100 rounded-full h-12 w-12 overflow-hidden flex items-center justify-center"
              >
                <i class="vuu-account-tie text-4xl m-0 before:!m-0"></i>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white capitalize">
                {{ role.name }}
              </p>
            </div>
            <div
              class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
            >
              <i class="vuu-right-arrow text-xl"></i>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { RouteName } from '@/enums/RouteName'
import BreadcrumbView from '@/components/BreadcrumbView.vue'
import { onMounted, ref } from 'vue'
import { isGranted } from '@/api/UserApi'
import { PermissionName } from '@/enums/PermissionName'
import type { RolesInterface } from '@/api/RolesApi'
import { getRoles } from '@/api/RolesApi'

const roles = ref<RolesInterface[]>()
onMounted(async () => {
  roles.value = await getRoles()
})
</script>

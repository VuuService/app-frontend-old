<script lang="ts" setup>
import { RouteName } from '@/enums/RouteName'
import { userStore } from '@/stores/AuthStore'
import { PermissionName } from '@/enums/PermissionName'
import { isGranted } from '@/api/UserApi'

const { user } = userStore()
</script>

<template>
  <div class="w-full bg-white">
    <div class="flex justify-end px-4 pt-4">
      <button
        id="dropdownButton"
        class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
        data-dropdown-toggle="dropdown"
        type="button"
      >
        <span class="sr-only">Open dropdown</span>
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 16 3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
          />
        </svg>
      </button>
      <!-- Dropdown menu -->
      <div
        id="dropdown"
        class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul aria-labelledby="dropdownButton" class="py-2">
          <li>
            <a
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              href="#"
              >Edit</a
            >
          </li>
          <li>
            <a
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              href="#"
              >Export Data</a
            >
          </li>
          <li>
            <a
              class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              href="#"
              >Delete</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col items-center pb-10">
      <img
        alt="Bonnie image"
        class="w-24 h-24 mb-3 rounded-full shadow-lg"
        src="https://picsum.photos/200"
      />
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white"></h5>
      <span class="text-sm text-gray-500 dark:text-gray-400">{{ user.role }}</span>
    </div>
    <div class="grid grid-cols-2 gap-2 px-2">
      <router-link
        v-if="isGranted(PermissionName.users_read)"
        :to="{ name: RouteName.users }"
        class="inline-flex items-center justify-center p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <i class="vuu-account-outline text-2xl"></i>
        <h5 class="font-bold tracking-tight text-gray-900 text-center dark:text-white">
          {{
            isGranted(PermissionName.admin_op) || isGranted(PermissionName.seller_sales)
              ? 'Kullanıcılar'
              : 'Personel'
          }}
        </h5></router-link
      >

      <router-link
        :to="{ name: RouteName.users }"
        class="inline-flex items-center justify-center p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <i class="vuu-account-outline text-2xl"></i>
        <h5 class="font-bold tracking-tight text-gray-900 dark:text-white">Satıcı</h5>
      </router-link>
      <router-link
        :to="{ name: RouteName.users }"
        class="inline-flex items-center justify-center p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <i class="vuu-account-outline text-2xl"></i>
        <h5 class="font-bold tracking-tight text-gray-900 dark:text-white">Personel</h5>
      </router-link>
      <router-link
        :to="{ name: RouteName.stocks }"
        class="inline-flex items-center justify-center p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <i class="vuu-box text-2xl"></i>
        <h5 class="font-bold tracking-tight text-gray-900 dark:text-white">Ürün</h5>
      </router-link>
      <router-link
        :to="{ name: RouteName.definitions }"
        class="inline-flex items-center justify-center p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <i class="vuu-sort text-2xl"></i>
        <h5 class="font-bold tracking-tight text-gray-900 dark:text-white">Tanımlama</h5>
      </router-link>
      <a
        class="inline-flex items-center justify-center p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        href="#"
      >
        <i class="vuu-account-outline text-2xl"></i>
        <h5 class="font-bold tracking-tight text-gray-900 dark:text-white">Kasa</h5>
      </a>
    </div>
  </div>
</template>
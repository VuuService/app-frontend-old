<script lang="ts" setup>
import { PermissionName } from '@/enums/PermissionName'
import { isGranted, isRole } from '@/api/UserApi'
import UserProfile from '@/views/account/UserProfile.vue'
import { RoleName } from '@/enums/RoleName'
import { RouteName } from '@/enums/RouteName'
</script>

<template>
  <div class="w-full bg-white">
    <user-profile></user-profile>
    <div class="grid grid-cols-2 gap-2 px-2">
      <router-link
        v-if="isGranted(PermissionName.users_read)"
        :to="{ name: RouteName.users }"
        class="inline-flex items-center justify-center p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <i class="vuu-account-outline text-2xl"></i>
        <h5 class="font-bold tracking-tight text-gray-900 text-center dark:text-white">
          {{ isRole([RoleName.admin, RoleName.seller]) ? 'Kullanıcılar' : 'Personel' }}
        </h5></router-link
      >

      <router-link
        v-if="false"
        :to="{ name: RouteName.users }"
        class="inline-flex items-center justify-center p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <i class="vuu-account-outline text-2xl"></i>
        <h5 class="font-bold tracking-tight text-gray-900 dark:text-white">Satıcı</h5>
      </router-link>
      <router-link
        v-if="false"
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

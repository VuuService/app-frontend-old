<template>
  <breadcrumb-view></breadcrumb-view>
  <form class="px-4 py-4" @submit.prevent="submit">
    <input-view v-model="role.name" placeholder="Görev Adı"></input-view>
    <div
      v-for="module in modules"
      :key="module"
      class="block max-w-sm p-3 mb-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {{ module }}
      </h5>
      <div class="grid grid-cols-2 gap-2">
        <toggle-button
          v-for="permission in Object.values(PermissionName).filter((x) => x.includes(module))"
          :key="permission"
          v-model="role.permissions"
          :placeholder="permission"
          :value="permission"
        ></toggle-button>
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
import InputView from '@/components/InputView.vue'
import { onMounted, ref } from 'vue'
import { type RolesCreateInterface, saveRole } from '@/api/RolesApi'
import { ModuleName } from '@/enums/ModuleName'
import ToggleButton from '@/components/ToggleButton.vue'
import { PermissionName } from '@/enums/PermissionName'
import { userStore } from '@/stores/AuthStore'
import router from '@/router'
import { RouteName } from '@/enums/RouteName'

const modules = Object.keys(ModuleName)
const { user, company } = userStore()
const role = ref<RolesCreateInterface>({
  name: null,
  permissions: [],
  company: company?._id as string
})

const submit = async () => {
  await saveRole(role.value).then(() => router.push({ name: RouteName.roles }))
}

onMounted(() => {
  if (user?.company?._id) {
    role.value.company = user?.company?._id || undefined
  }
})
</script>

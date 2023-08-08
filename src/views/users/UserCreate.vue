<template>
  <breadcrumb-view></breadcrumb-view>

  <div v-if="key" class="px-4">
    <h4 class="text-2xl font-bold dark:text-white">Davetiye</h4>
    <copy-clipboard :value="key" class="p-4"></copy-clipboard>
  </div>
  <form v-else class="px-2 py-4" @submit.prevent="submit">
    <div v-if="isRole([RoleName.admin])" class="mb-4">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="role"
        >Üye tipi seçin</label
      >
      <select
        id="role"
        v-model="role"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      >
        <option v-for="role in Object.keys(RoleName)" :key="role" :value="role">{{ role }}</option>
      </select>
    </div>

    <Accordion class="mb-8 shadow">
      <accordion-panel>
        <accordion-header>Görev Tanımı</accordion-header>
        <accordion-content>
          <div class="grid grid-cols-2">
            <toggle-button
              v-for="role in roles"
              :key="role._id"
              v-model="selectedRole"
              :disabled="disabledRoles(role)"
              :placeholder="role.name"
              :value="role"
              v-on:change="changeRole(role)"
            ></toggle-button>
          </div>
        </accordion-content>
      </accordion-panel>
      <accordion-panel>
        <accordion-header> Modül İzinleri</accordion-header>
        <accordion-content>
          <div
            v-for="module in Object.keys(ModuleName)"
            :key="module"
            class="block max-w-sm p-3 mb-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ module }}
            </h5>
            <div class="grid grid-cols-2 gap-2">
              <toggle-button
                v-for="permission in Object.values(PermissionName).filter((x) =>
                  x.includes(module)
                )"
                :key="permission"
                v-model="selectedPermissions"
                :placeholder="permission"
                :value="permission"
              ></toggle-button>
            </div>
          </div>
        </accordion-content>
      </accordion-panel>
    </Accordion>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="submit"
    >
      Davetiye oluştur
    </button>
  </form>
</template>
<script lang="ts" setup>
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'flowbite-vue'
import BreadcrumbView from '@/components/BreadcrumbView.vue'
import { onMounted, ref } from 'vue'
import { getRoles, type RolesInterface } from '@/api/RolesApi'
import ToggleButton from '@/components/ToggleButton.vue'
import { PermissionName } from '@/enums/PermissionName'
import { ModuleName } from '@/enums/ModuleName'
import {
  createReference,
  type CreateReferenceInterface,
  type ReferenceInterface
} from '@/api/ReferencesApi'
import { userStore } from '@/stores/AuthStore'
import { RoleName } from '@/enums/RoleName'
import { isRole } from '@/api/UserApi'
import CopyClipboard from '@/components/CopyClipboard.vue'
import type { CompanyInterface } from '@/api/CompanyApi'

const selectedRole = ref<RolesInterface[]>([])
const selectedPermissions = ref<string[]>([])
const role = ref()

const disabledRoles = (role: RolesInterface) => {
  if (selectedRole.value.length > 0) {
    return !selectedRole.value.includes(role)
  }
  return false
}

const roles = ref<RolesInterface[]>()
const changeRole = (role: RolesInterface) => {
  if (selectedRole.value.length > 0) {
    selectedPermissions.value = selectedPermissions.value.concat(role.permissions)
  } else {
    selectedPermissions.value = selectedPermissions.value.filter(
      (x) => !role.permissions.includes(x)
    )
  }
}

const { user } = userStore()

const reference = ref<CreateReferenceInterface>({
  company: user.company as CompanyInterface,
  box: { permissions: [] }
})

const key = ref<string | null>(null)
const submit = async () => {
  const data = reference.value
  if (data.box) {
    if (selectedRole.value.length > 0) {
      data.box.title = selectedRole.value[0].name
    }
    if (role.value) {
      data.box.role = role.value
    } else {
      data.box.role = isRole([RoleName.seller]) ? RoleName.boss : RoleName.user
    }
    if (data.box.permissions) {
      data.box.permissions = selectedPermissions.value
    }
  }
  key.value = await createReference(data).then(
    (reference: ReferenceInterface) => import.meta.env.VITE_BASE_URL + `/register/${reference.key}`
  )
}
onMounted(async () => {
  roles.value = await getRoles()
})
</script>

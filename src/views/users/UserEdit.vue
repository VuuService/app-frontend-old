<template>
  <breadcrumb-view></breadcrumb-view>

  <form class="px-2 py-4" @submit.prevent="submit">
    <input-view v-model="userData.firstName" placeholder="İsim"></input-view>
    <input-view v-model="userData.lastName" placeholder="Soyisim"></input-view>
    <input-view v-model="userData.email" placeholder="E-Posta" type="email"></input-view>
    <input-view v-model="userData.phone" placeholder="Telefon" type="tel"></input-view>
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
          <div class="grid grid-cols-2 gap-2">
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
      Kaydet
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
import { RoleName } from '@/enums/RoleName'
import { getUser, isRole, updateUser, type UserInterface } from '@/api/UserApi'
import InputView from '@/components/InputView.vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { RouteName } from '@/enums/RouteName'

const selectedRole = ref<RolesInterface[]>([])
const selectedPermissions = ref<string[]>([])
const role = ref()
const userData = ref<UserInterface>({
  email: null,
  phone: null,
  firstName: null,
  lastName: null,
  permissions: [],
  title: null,
  role: null,
  company: null
})

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

const submit = async () => {
  const data: UserInterface = { ...userData.value }
  if (selectedRole.value.length > 0) {
    data.title = selectedRole.value[0].name
  }
  if (role.value) {
    data.role = role.value
  } else {
    data.role = isRole([RoleName.seller]) ? RoleName.boss : RoleName.user
  }
  if (data.permissions) {
    data.permissions = selectedPermissions.value
  }
  await updateUser(route.params.id, data).then(() => router.push({ name: RouteName.users }))
}
const route = useRoute()
onMounted(async () => {
  roles.value = await getRoles()
  console.log(roles.value)
  if (route.params.id) {
    userData.value = await getUser(route.params.id)
    role.value = userData.value.role.toString().toLowerCase()
    const sr = roles.value.find((x) => userData.value.title === x.name)
    selectedRole.value.push(sr)
    selectedPermissions.value = userData.value.permissions
  }
})
</script>

<template>
  <breadcrumb-view></breadcrumb-view>
  <form class="px-4 py-4">
    <div class="relative z-0 w-full mb-6 group">
      <input
        id="floating_email"
        v-model="data.email"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        name="floating_email"
        placeholder=" "
        required
        type="email"
      />
      <label
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        for="floating_email"
        >E-Posta Adresi</label
      >
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input
        id="floating_password"
        v-model="data.password"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        name="floating_password"
        placeholder=" "
        required
        type="password"
      />
      <label
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        for="floating_password"
        >Parola</label
      >
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input
        id="floating_repeat_password"
        v-model="data.password_confirmation"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        name="repeat_password"
        placeholder=" "
        required
        type="password"
      />
      <label
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        for="floating_repeat_password"
        >Parola tekrar</label
      >
    </div>
    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative z-0 w-full mb-6 group">
        <input
          id="floating_first_name"
          v-model="data.name"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          name="floating_first_name"
          placeholder=" "
          required
          type="text"
        />
        <label
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          for="floating_first_name"
          >İsim</label
        >
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input
          id="floating_last_name"
          v-model="data.surname"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          name="floating_last_name"
          placeholder=" "
          required
          type="text"
        />
        <label
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          for="floating_last_name"
          >Soyisim</label
        >
      </div>
    </div>
    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative z-0 w-full mb-6 group">
        <input
          id="floating_phone"
          v-model="data.phone"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          name="floating_phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder=" "
          required
          type="tel"
        />
        <label
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          for="floating_phone"
          >Telefon Numarası</label
        >
      </div>

      <div class="grid grid-cols-4 pb-6">
        <div class="flex justify-between items-center">
          <label class="relative inline-flex items-center cursor-pointer">
            <input v-model="data.isSaler" class="sr-only peer" type="checkbox" value="" />
            <div
              class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>
          </label>
          <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"> Satıcı mı?</span>
        </div>
      </div>

      <Accordion class="mb-8 shadow">
        <accordion-panel>
          <accordion-header>Görev Tanımı</accordion-header>
          <accordion-content>
            <div class="grid grid-cols-2 gap-2">
              <div v-for="i in roles" :key="i" class="flex justify-between items-center">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    :checked="i.checked"
                    class="sr-only peer"
                    type="checkbox"
                    value=""
                    @change="checkRole(i.id)"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                  ></div>
                </label>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Görev Tanımı {{ i.name }}
                </span>
              </div>
            </div>
          </accordion-content>
        </accordion-panel>
        <accordion-panel>
          <accordion-header> Modül İzinleri</accordion-header>
          <accordion-content>
            <div
              v-for="(groupedPermissions, module) in permissions"
              :key="module"
              class="border-b py-2"
            >
              <div class="mb-2 flex justify-between items-center pb-6">
                <div class="font-bold">{{ module }} İzinleri</div>

                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    :checked="permissions[module].isAllChecked()"
                    class="sr-only peer"
                    type="checkbox"
                    @change="toggleModulePermissions(module, permissions[module].isAllChecked())"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                  ></div>
                  <span class="ml-2">Tümünü Seç</span>
                </label>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="permission in groupedPermissions.permissions"
                  :key="permission.id"
                  class="flex justify-between items-center border-2 rounded-xl p-2"
                >
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      :id="permission.id"
                      :checked="permission.checked"
                      class="sr-only peer"
                      type="checkbox"
                      @change="handlePermissionChange(permission)"
                    />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    ></div>
                  </label>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {{ permission.permission }}
                  </span>
                </div>
              </div>
            </div>
          </accordion-content>
        </accordion-panel>
      </Accordion>

      <Accordion>
        <accordion-panel>
          <accordion-content>
            <div class="font-bold">Seçilen İzinler</div>
            <div v-for="i in selectedPermissions" :key="i">
              {{ i.module + ' ' + i.permission }}
            </div>
          </accordion-content>
        </accordion-panel>
      </Accordion>
    </div>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="submit"
      @click.prevent="submitForm"
    >
      Submit
    </button>
  </form>
</template>
<script lang="ts" setup>
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'flowbite-vue'
import BreadcrumbView from '@/components/BreadcrumbView.vue'
import { GetPermissionsFn, GetRolesFn } from '@/api/permissionsApi'
import { ref } from 'vue'
import { api } from '@/api/backendService'

let permissions = ref({})
let roles = ref({})

let data = ref({
  email: '',
  password: '',
  password_confirmation: '',
  name: '',
  surname: '',
  phone: '',
  isSaler: true,
  permissions: [],
  roles: []
})

GetPermissionsFn().then((res) => {
  permissions.value = groupByModule(res)
})

GetRolesFn().then((res) => {
  roles.value = res

  roles.value.forEach((role) => {
    role.checked = false
  })
})

function checkRole(roleId) {
  const role = roles.value.find((x) => x.id === roleId)
  role.checked = !role.checked
  role.permissions.forEach((permission) => {
    permissions.value[permission.module].permissions.find((x) => x.id === permission.id).checked =
      role.checked
  })

  console.log((data.value.roles = roles.value.filter((x) => x.checked)))
}

function isRoleAllChecked(roleId) {
  const role = roles.value.find((x) => x.id === roleId)
  return role.permissions.every(
    (perm) => permissions.value[perm.module].permissions[perm.id].checked
  )
}

function groupByModule(permissions) {
  const grouped = {}

  permissions.forEach((permission) => {
    if (!grouped[permission.module]) {
      grouped[permission.module] = {
        permissions: [],
        isAllChecked: () => grouped[permission.module].permissions.every((perm) => perm.checked)
      }
    }

    grouped[permission.module].permissions.push(permission)
  })

  return grouped
}

let moduleSelection = ref([])
let selectedPermissions = ref([])

function handlePermissionChange(permission) {
  permission.checked = !permission.checked

  // Find the role that contains the modified permission
  const role = roles.value.find((r) => r.permissions.some((p) => p.id === permission.id))

  // Check if all permissions in the role are checked
  if (role) {
    // Check if all permissions in the role are checked
    role.checked = role.permissions.every((p) => p.checked)
  }

  // Add or remove the permission from the selectedPermissions array
  if (permission.checked) {
    selectedPermissions.value.push(permission)
  } else {
    selectedPermissions.value = selectedPermissions.value.filter((x) => x.id !== permission.id)
  }
}

function toggleModulePermissions(module, isAllChecked) {
  permissions.value[module].permissions.forEach((x) => (x.checked = !isAllChecked))

  if (isAllChecked) {
    selectedPermissions.value = selectedPermissions.value.filter((x) => x.module !== module)
  } else {
    let excludedPermissions = permissions.value[module].permissions.filter(
      (x) => !selectedPermissions.value.includes(x)
    )

    selectedPermissions.value = [...selectedPermissions.value, ...excludedPermissions]
  }
}

function submitForm() {
  data.value.permissions = selectedPermissions.value
  data.value.roles = roles.value.filter((x) => x.checked)

  let excludePermission = []
  data.value.roles.forEach((role) => {
    role.permissions.forEach((permission) => {
      if (!data.value.permissions.includes(permission)) {
        excludePermission.push(permission)
      }
    })
  })

  selectedPermissions.value = selectedPermissions.value.filter(
    (x) => !excludePermission.includes(x)
  )

  api.post('admin/createCustomer', data.value).then((res) => {
    console.log(res)
  })
}
</script>
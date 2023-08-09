<template>
  <div v-if="isGranted(PermissionName.users_update)" class="flex justify-end px-4 pt-4">
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
          <router-link
            :to="{
              name: RouteName.users_update,
              params: { fullname: user.firstName + '-' + user.lastName, id: user._id }
            }"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >Düzenle
          </router-link>
        </li>
        <li>
          <a
            class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            role="button"
            @click="modal.show()"
            >Sil</a
          >
        </li>
      </ul>
    </div>
  </div>
  <div class="flex flex-col items-center pb-10">
    <img
      :src="'https://picsum.photos/200/300?random=' + randomInt(1, 999 * 999)"
      class="w-24 h-24 mb-3 rounded-full shadow-lg"
    />
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
      {{ user?.firstName + ' ' + user?.lastName }}
    </h5>
    <span v-if="user?.title" class="text-sm text-gray-500 dark:text-gray-400">{{
      user?.title
    }}</span>
    <div v-if="user?.phone">
      <a :href="'tel:0' + user.phone">{{ user.phone }}</a>
    </div>
  </div>
  <div v-if="user?.permissions.length > 0" class="px-4">
    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
      Modül İzinleri
    </h5>
    <div
      v-for="module in Object.values(ModuleName).filter(
        (x) => user.permissions.filter((y) => y.includes(x)).length > 0
      )"
      :key="module"
      class="block max-w-sm p-3 mb-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {{ module }}
      </h5>
      <div class="grid grid-cols-2 gap-2">
        <span
          v-for="permission in user.permissions.filter((x) => x.includes(module))"
          :key="permission"
          >{{ permission }}</span
        >
      </div>
    </div>
  </div>
  <static-modal @modal="(v: ModalInterface) => (modal = v)">
    <template #header>Silmek istediğinize emin misiniz?</template>
    {{ user.firstName }} {{ user.lastName }} silinecek.
    <template #footer>
      <button
        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
        @click="deleteUser"
      >
        Sil
      </button>
      <button
        class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
        type="button"
        @click="modal.hide()"
      >
        Vazgeç
      </button>
    </template>
  </static-modal>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { UserInterface } from '@/api/UserApi'
import { destroyUser, getUser, isGranted, userData } from '@/api/UserApi'
import { useRoute } from 'vue-router'
import { randomInt } from '@/utils/math'
import type { DropdownInterface, DropdownOptions, ModalInterface } from 'flowbite'
import { Dropdown } from 'flowbite'
import { PermissionName } from '@/enums/PermissionName'
import { ModuleName } from '@/enums/ModuleName'
import { RouteName } from '@/enums/RouteName'
import StaticModal from '@/components/StaticModal.vue'
import router from '@/router'

const modal = ref()
const menu = ref<HTMLElement>()
const button = ref<HTMLElement>()
const dropdown = ref<DropdownInterface>()

const route = useRoute()

const user = ref<UserInterface>({ ...userData })

const deleteUser = () => {
  destroyUser(user.value._id).then(() => {
    modal.value.hide()
    router.push({ name: RouteName.users })
  })
}

onMounted(async () => {
  if (route.params?.id) {
    user.value = await getUser(route.params.id.toString())
  }
  const options: DropdownOptions = {
    placement: 'bottom',
    triggerType: 'click',
    offsetSkidding: 0,
    offsetDistance: 10,
    delay: 300
  }

  menu.value = document.getElementById('dropdown')
  button.value = document.getElementById('dropdownButton')
  dropdown.value = new Dropdown(menu.value, button.value, options)
})
</script>
<template>
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
            role="button"
            @click="logout()"
            >Çıkış</a
          >
        </li>
      </ul>
    </div>
  </div>
  <div class="flex flex-col items-center pb-10">
    <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://picsum.photos/200/300" />
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
      {{ user.firstName + user.lastName }}
    </h5>
    <span v-if="user?.title" class="text-sm text-gray-500 dark:text-gray-400">{{
      user.title
    }}</span>
  </div>
</template>
<script lang="ts" setup>
import type { DropdownInterface, DropdownOptions } from 'flowbite'
import { Dropdown } from 'flowbite'
import { onMounted, ref } from 'vue'
import { userStore } from '@/stores/AuthStore'

const { user, logout } = userStore()

const menu = ref<HTMLElement>()
const button = ref<HTMLElement>()
const dropdown = ref<DropdownInterface>()

const show = () => {
  dropdown.value?.show()
}

onMounted(() => {
  const options: DropdownOptions = {
    placement: 'bottom',
    triggerType: 'click',
    offsetSkidding: 0,
    offsetDistance: 10,
    delay: 300,
    onHide: () => {
      console.log('dropdown has been hidden')
    },
    onShow: () => {
      console.log('dropdown has been shown')
    },
    onToggle: () => {
      console.log('dropdown has been toggled')
    }
  }

  menu.value = document.getElementById('dropdown')
  button.value = document.getElementById('dropdownButton')
  dropdown.value = new Dropdown(menu.value, button.value, options)
})
</script>
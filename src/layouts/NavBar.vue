<script lang="ts" setup>
import { userStore } from '@/stores/AuthStore'

const store = userStore()
</script>
<template>
  <nav
    class="max-w-md max-auto bg-white dark:bg-gray-900 fixed w-full z-20 top-0 border-b border-gray-200 dark:border-gray-600"
  >
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a v-if="store.user.company" class="flex items-center" href="https://flowbite.com/">
        <img alt="Flowbite Logo" class="h-8 mr-3" src="https://flowbite.com/docs/images/logo.svg" />
        <span>{{ store.user.company.name }}</span>
      </a>
      <div class="flex md:order-2">
        <button
          class="hidden md:flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Get started
        </button>
      </div>
      <div
        id="navbar-sticky"
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      >
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <a
              aria-current="page"
              class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
              href="#"
              >Home</a
            >
          </li>
          <li>
            <a
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              href="#"
              >About</a
            >
          </li>
          <li>
            <a
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              href="#"
              >Services</a
            >
          </li>
          <li>
            <a
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              href="#"
              >Contact</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

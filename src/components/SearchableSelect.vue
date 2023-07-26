<template>
  <div class="group mb-4">
    <div class="relative z-0 w-full">
      <input
        :id="id"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
        type="email"
      />
      <label
        :for="id"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Görev adı</label
      >
    </div>
    <div class="relative w-full">
      <div
        class="z-10 absolute top-0 w-full ease-in delay-100 invisible group-focus-within:visible"
      >
        <ul class="divide-y divide-gray-100 rounded-lg shadow-md bg-white dark:bg-gray-700">
          <li v-for="i in 3" :key="i" class="pb-3 sm:pb-4">
            <div class="flex items-center space-x-4 px-2">
              <div class="flex-shrink-0">
                <img
                  alt="Neil image"
                  class="w-8 h-8 rounded-full"
                  src="/docs/images/people/profile-picture-1.jpg"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Neil Sims</p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">email@flowbite.com</p>
              </div>
              <div
                class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
              >
                $320
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { randomInt } from '@/utils/math'

const id = ref<string>('search' + randomInt(0, 99999))
</script>
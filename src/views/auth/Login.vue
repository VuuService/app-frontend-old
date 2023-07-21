<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="border rounded-lg shadow-md w-96 p-6">
      <!-- Logo Ekleme -->
      <div class="mb-6 text-center">
        <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" class="w-20 mx-auto" />
      </div>
      <!-- Login Formu -->
      <h1 class="text-3xl font-semibold mb-6">Giriş Yap</h1>
      <form @submit.prevent="">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-bold mb-2">E-Posta</label>
          <input type="email" id="email" v-model="email" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-bold mb-2">Şifre</label>
          <input type="password" id="password" v-model="password" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Giriş Yap</button>
      </form>
      <div class="text-center mt-4">
        <a href="#" class="text-blue-500 hover:underline" @click="">Şifreni mi unuttun?</a>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
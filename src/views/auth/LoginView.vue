<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '@/stores/AuthStore'
import { RouteName } from '@/enums/RouteName'

const showSuccessMessage = ref(false)
const showErrorMessage = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const { login } = userStore()

const router = useRouter()

const LoginData = ref({
  email: 'ayunus155@gmail.com',
  password: 'turkey'
})

async function submit() {
  await login(LoginData.value).then(() => router.go({ name: RouteName.account }))
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="border rounded-lg shadow-md w-96 p-6">
      <!-- Logo Ekleme -->
      <div class="mb-6 text-center">
        <img alt="Logo" class="w-20 mx-auto" src="https://flowbite.com/docs/images/logo.svg" />
      </div>

      <div
        v-if="showSuccessMessage"
        class="mb-4 bg-green-500 text-white px-3 py-2 rounded-md text-center"
      >
        {{ successMessage }}
      </div>
      <div
        v-else-if="showErrorMessage"
        class="mb-4 bg-red-500 text-white px-3 py-2 rounded-md text-center"
      >
        {{ errorMessage }}
      </div>
      <!-- Login Formu -->
      <h1 class="text-3xl font-semibold mb-6">Giriş Yap</h1>

      <form @submit.prevent="submit">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="email">Kullanıcı Adı</label>
          <input
            id="email"
            v-model="LoginData.email"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="text"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="password">Şifre</label>
          <input
            id="password"
            v-model="LoginData.password"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="password"
          />
        </div>
        <button
          class="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-900 text-white font-bold py-2 px-4 rounded-md"
          type="submit"
        >
          Giriş Yap
        </button>
      </form>
      <div v-if="showSuccessMessage" class="text-center mt-4">
        <a class="text-blue-500 hover:underline" href="#">Şifreni mi unuttun?</a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
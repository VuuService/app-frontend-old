<script xlang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'

const showSuccessMessage = ref(false)
const showErrorMessage = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const { login } = useAuthStore()

const router = useRouter()

const LoginData = ref({
  username: '',
  password: ''
})
async function submit() {
  const result = await login(LoginData.value)
  if (result.isError) {
    errorMessage.value = result.msg
    showErrorMessage.value = true
    showSuccessMessage.value = false
  } else {
    successMessage.value = result.msg
    showSuccessMessage.value = true
    showErrorMessage.value = false
    router.push('/')
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="border rounded-lg shadow-md w-96 p-6">
      <!-- Logo Ekleme -->
      <div class="mb-6 text-center">
        <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" class="w-20 mx-auto" />
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
          <label for="email" class="block text-gray-700 font-bold mb-2">Kullanıcı Adı</label>
          <input
            type="text"
            id="username"
            v-model="LoginData.username"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-bold mb-2">Şifre</label>
          <input
            type="password"
            id="password"
            v-model="LoginData.password"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-900 text-white font-bold py-2 px-4 rounded-md"
        >
          Giriş Yap
        </button>
      </form>
      <div class="text-center mt-4">
        <a href="#" class="text-blue-500 hover:underline" @click="">Şifreni mi unuttun?</a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

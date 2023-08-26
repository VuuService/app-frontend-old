<template>
  <div
    id="sessionModal"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    tabindex="-1"
  >
    <form @submit.prevent="submit">
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
              Oturum Süreniz Doldu.
            </h3>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <input-view
              v-model="userData.password"
              placeholder="Parola"
              required
              type="password"
            ></input-view>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit"
            >
              Oturum aç
            </button>
            <button
              class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
              type="button"
              @click="
                () => {
                  modal?.hide()
                  user.logout()
                }
              "
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import type { ModalInterface, ModalOptions } from 'flowbite'
import { Modal } from 'flowbite'
import { onMounted, ref } from 'vue'
import InputView from '@/components/InputView.vue'
import { userStore } from '@/stores/AuthStore'
import { useRoute } from 'vue-router'

const user = userStore()
const userData = ref({
  email: user.user.email,
  password: null
})
const submit = () => {
  user.login(userData.value).then(() => modal.value?.hide())
}
const sessionModalement = ref<HTMLElement>()
const modal = ref<ModalInterface>()
const route = useRoute()
onMounted(() => {
  const modalOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'static',
    backdropClasses: 'bg-gray-600 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: false
  }
  sessionModalement.value = document.getElementById('sessionModal') || undefined
  modal.value = new Modal(sessionModalement.value, modalOptions)
  document.getElementById('app')?.addEventListener('click', function (event) {
    if (modal.value) {
      const exp = user.exp + 1000 * 10 * 60 * 60 * 12
      if (Date.now() > exp) {
        event.preventDefault()
        modal.value.show()
      } else {
        modal.value.hide()
      }
    }
  })
})
</script>

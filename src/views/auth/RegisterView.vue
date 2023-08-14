<template>
  <section v-if="reference" class="bg-gray-50 dark:bg-gray-900">
    <div
      class="w-full flex flex-wrap overflow-x-hidden flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        class="flex items-center break-words mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        href="#"
      >
        <img
          alt="logo"
          class="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
        />
        <span v-if="isUser">{{ reference?.company?.name }}</span
        ><span v-else>Vuu Digital</span>
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Hesap oluştur
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="save">
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="firstName"
                >İsim</label
              >
              <input
                id="firstName"
                v-model="user.firstName"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="firstName"
                placeholder="Ahmet"
                required
                type="text"
              />
            </div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="lastName"
                >Soyisim</label
              >
              <input
                id="lastName"
                v-model="user.lastName"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="lastName"
                placeholder="Yıldız"
                required
                type="text"
              />
            </div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="email"
                >E-Posta adresiniz</label
              >
              <input
                id="email"
                v-model="user.email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="email"
                placeholder="isim@gmail.com"
                required
                type="email"
              />
            </div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="phone"
                >Telefon Numaranız</label
              >
              <input
                id="phone"
                v-model="user.phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="email"
                pattern="[0-9]{10}"
                placeholder="5335552233"
                required
                title="Başında sıfır olmadan telefon numaranızı girin"
                type="tel"
              />
            </div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="password"
                >Parola</label
              >
              <input
                id="password"
                v-model="user.password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="password"
                placeholder="••••••••"
                required
                type="password"
              />
            </div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="confirm-password"
                >Parola Tekrar</label
              >
              <input
                id="confirm-password"
                v-model="user.repassword"
                :class="{
                  'border-red-300': !status,
                  'focus:border-red-600': !status,
                  'focus:ring-red-600': !status
                }"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="confirm-password"
                placeholder="••••••••"
                required
                type="password"
                @input="statusCheck()"
              />
              <span v-if="!status" class="text-red-600">Parola uyuşmuyor</span>
            </div>
            <div v-if="false" class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required
                  type="checkbox"
                />
              </div>
              <div class="ml-3 text-sm">
                <label class="font-light text-gray-500 dark:text-gray-300" for="terms"
                  >I accept the
                  <a
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                    >Terms and Conditions</a
                  ></label
                >
              </div>
            </div>
            <a
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              href="#confirm-password"
              role="button"
              type="submit"
              @click="save"
            >
              Hesap Oluştur
            </a>
            <p v-if="false" class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#"
                >Login here</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
  <div v-else>Davetiye bulunamadı. Yöneticinize başvurun.</div>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getReference, type ReferenceInterface } from '@/api/ReferencesApi'
import type { UserInterface } from '@/api/UserApi'
import { userData } from '@/api/UserApi'
import { userStore } from '@/stores/AuthStore'
import router from '@/router'
import { RoleName } from '@/enums/RoleName'

const route = useRoute()
const reference = ref<ReferenceInterface>()
const user = ref<UserInterface>({ ...userData })
const isUser = ref<boolean>(RoleName.user === reference.value?.box?.role)
const status = ref<boolean>(true)
const statusCheck = () => {
  status.value = user.value.password == user.value.repassword && user.value.password != null
}
const { register } = userStore()
const save = async () => {
  statusCheck()
  console.log(status.value)
  if (status.value) {
    const userData: UserInterface = { ...user.value }
    delete userData.repassword
    if (reference.value?.box?.permissions) {
      userData.permissions = reference.value.box.permissions
    }
    if (reference.value?.box?.role) {
      userData.role = reference.value.box.role
    }
    if (reference.value?.box?.title) {
      userData.title = reference.value.box.title
    }
    if (reference.value?.company) {
      userData.company = reference.value.company
    }
    await register({ ...userData, key: reference.value?.key }).then((r) => {
      r.success ? router.push('/') : true
    })
  }
}
onBeforeMount(async () => {
  if (route.params?.reference) {
    reference.value = await getReference(route.params.reference.toString())
    console.log(reference.value)
  }
})
</script>

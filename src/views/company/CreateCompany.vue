<template>
  <breadcrumb-view></breadcrumb-view>
  <form class="px-4" @submit.prevent="submit">
    <input-view v-model="fullName" disabled placeholder="İşletme Sahibi"></input-view>
    <input-view v-model="company.name" placeholder="İşletme Adı" required></input-view>
    <input-view
      v-model="company.phone"
      pattern="[0-9]{10}"
      placeholder="İşletme İletişim Numarası"
      required
      type="tel"
    ></input-view>

    <button
      class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="submit"
    >
      Kaydet ve Devam Et!
    </button>
  </form>
</template>
<script lang="ts" setup>
import { userStore } from '@/stores/AuthStore'
import BreadcrumbView from '@/components/BreadcrumbView.vue'
import InputView from '@/components/InputView.vue'
import { ref } from 'vue'
import type { CompanyInterface } from '@/api/CompanyApi'
import { saveCompany } from '@/api/CompanyApi'
import router from '@/router'
import { RouteName } from '@/enums/RouteName'

const { user } = userStore()
const fullName = ref<string>(user.firstName + ' ' + user.lastName)

const company = ref<CompanyInterface>({ name: null, owner: user._id as string, phone: null })

const submit = async () => {
  await saveCompany(company.value).then(() => {
    router.push({ name: RouteName.account })
  })
}
</script>

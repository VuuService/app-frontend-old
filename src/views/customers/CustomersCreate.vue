<template>
  <breadcrumb-view></breadcrumb-view>
  <form class="p-4" @submit.prevent="submit">
    <input-view v-model="customer.firstName" placeholder="İsim"></input-view>
    <input-view v-model="customer.lastName" placeholder="Soyisim"></input-view>
    <input-view
      v-model="customer.phone"
      pattern="[0-9]{10}"
      placeholder="Telefon Numarası"
      title="Başında sıfır olmadan girin."
      type="tel"
    ></input-view>
    <cities-view v-if="customer.address" v-model="customer.address"></cities-view>
    <definitions-panel
      v-model="customer.properties"
      :module="ModuleName.users"
      :properties="customer.properties"
    ></definitions-panel>
    <!-- //TODO  Burada konum butonuna tıklanınca openstreetmap adres bilgisi çekeceğiz. ayrıca geolocalation.coords -->
    <!-- //TODO input masklar yapılacak. quasara benzer bakıcaz buna -->
    <!-- //TODO  Burada sadece müşteri kaydetmek istene bilir. Eğer ki müşteriye cihaz satmak isteniyorsa ya da müşterinin cihazına direk bir bakım yapılacaksa kaydetin dışında butonlar koymalıyız. bu butonlar önce müşteriyi kaydedecek daha sonra ilgili ekrana atacak. Ekranları kaydırmalı düşünmüştüm. Ancak kullanıcının kafası karışa bilir. müşteri kayıt edildikten sonra ilgili ekranı route yaparak yönlendirmek en doğrusu hem müşterinin bilgileri gösterilir.

     -->
    <div v-if="customer.firstName && customer.phone" class="grid grid-cols-2 gap-2 py-4">
      <button
        class="inline-flex items-center justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        @click="saveAfterRouteOperation('sales')"
      >
        <i class="vuu-home"></i>
        <span> Satış İşlemleri </span>
      </button>
      <button
        class="inline-flex items-center justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        @click="saveAfterRouteOperation('maintenance')"
      >
        <i class="vuu-home"></i>
        <span> Bakım İşlemleri </span>
      </button>
    </div>
    <button
      class="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      type="submit"
    >
      Kaydet
    </button>
  </form>
</template>
<script lang="ts" setup>
import BreadcrumbView from '@/components/BreadcrumbView.vue'
import InputView from '@/components/InputView.vue'
import { ref } from 'vue'
import type { CustomerInterface } from '@/api/CustomersApi'
import { createCustomers, customerData } from '@/api/CustomersApi'
import CitiesView from '@/components/CitiesView.vue'
import DefinitionsPanel from '@/views/definitions/DefinitionsPanel.vue'
import { ModuleName } from '@/enums/ModuleName'
import { userStore } from '@/stores/AuthStore'
import router from '@/router'
import { RouteName } from '@/enums/RouteName'

const customer = ref<CustomerInterface>({ ...customerData })
const user = userStore()
const submit = async () => {
  customer.value.company = user.company
  await createCustomers(customer.value).then((r) => router.push({ name: RouteName.customers }))
}

async function saveAfterRouteOperation(operation: string) {
  customer.value.company = user.company
  await createCustomers(customer.value).then((r) =>
    operation === 'maintenance'
      ? router.push({
          name: RouteName.customers_maintenance_device,
          params: { id: r.message._id, fullName: r.message.firstName + '-' + r.message.lastName }
        })
      : console.log('satış işlemi')
  )
}
</script>
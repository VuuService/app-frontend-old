<template>
  <breadcrumb-view></breadcrumb-view>
  <form class="px-4" @submit.prevent="submit">
    <input-view v-model="stock.name" placeholder="Ürün Adı"></input-view>

    <div class="grid grid-cols-2 gap-1 mt-4">
      <radio-button v-model="stock.primary" :value="1" placeholder="Ana Ürün"></radio-button>
      <radio-button v-model="stock.primary" :value="0" placeholder="Yedek Parça"></radio-button>
    </div>

    <add-period v-model="stock.period"></add-period>

    <definitions-panel
      v-model="stock.properties"
      :module="ModuleName.stocks"
      static
    ></definitions-panel>
    <div class="flex items-baseline">
      <input-view
        v-model="stock.quantity"
        :disabled="stock.unlimited"
        :value="quantity"
        class="flex-1"
        placeholder="Miktar"
        type="number"
      ></input-view>
      <underline-select v-model="stock.unit" class="w-1/3" placeholder="Ölçü birimi">
        <option value="Adet">Adet</option>
        <option value="Kg">Kg</option>
        <option value="Lt">Lt</option>
      </underline-select>
      <toggle-button
        v-model="stock.unlimited"
        class="flex-1"
        placeholder="Sınırsız"
      ></toggle-button>
    </div>
    <calc-price v-model="stock.purchasePrices" name="Alış"></calc-price>
    <calc-price v-model="stock.sellingPrices" name="Satış"></calc-price>
    <div class="flex justify-end items-center">
      <button
        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        type="button"
        @click="router.push({ name: RouteName.stocks })"
      >
        Vazgeç
      </button>
      <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type="submit"
      >
        Kaydet
      </button>
    </div>
  </form>
</template>
<script lang="ts" setup>
import InputView from '@/components/InputView.vue'
import { createStocks, stockData, type StockInterface } from '@/api/StockApi'
import BreadcrumbView from '@/components/BreadcrumbView.vue'
import ToggleButton from '@/components/ToggleButton.vue'
import UnderlineSelect from '@/components/UnderlineSelect.vue'
import CalcPrice from '@/components/CalcPrice.vue'
import { computed, onMounted, ref } from 'vue'
import { isGranted } from '@/api/UserApi'
import { PermissionName } from '@/enums/PermissionName'
import { userStore } from '@/stores/AuthStore'
import DefinitionsPanel from '@/views/definitions/DefinitionsPanel.vue'
import { ModuleName } from '@/enums/ModuleName'
import AddPeriod from '@/views/stocks/addPeriod.vue'
import RadioButton from '@/components/RadioButton.vue'
import router from '@/router'
import { RouteName } from '@/enums/RouteName'

const stock = ref<StockInterface>({ ...stockData })
const store = userStore()
const quantity = computed(() => {
  if (stock.value.unlimited) {
    stock.value.quantity = 0
    return 0
  }
  return stock.value.quantity
})
const submit = async () => {
  const data = { ...stock.value }
  data.status = isGranted(PermissionName.stocks_save)
  data.company = store.company?._id as string
  data.primary = !!data.primary
  console.log(data)
  await createStocks(data).then((r) => {
    console.log(r.success, r.message)
    if (r.success) {
      router.push({ name: RouteName.stocks })
    }
  })
}
onMounted(() => {
  stock.value.primary = stock.value.primary ? 1 : 0
  if (stock.value.sellingPrices.length == 0) {
    stock.value.sellingPrices.push({
      price: null,
      name: null,
      tax_rate: null,
      vat_exempt: true,
      currency: 'TL'
    })
  }
})
</script>

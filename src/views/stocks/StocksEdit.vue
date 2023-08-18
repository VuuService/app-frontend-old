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
      :module="ModuleName.stocks"
      :properties="stock.properties"
      @update:modelValue="(x) => (stock.properties = x)"
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
import { getStock, stockData, type StockInterface, updateStock } from '@/api/StockApi'
import BreadcrumbView from '@/components/BreadcrumbView.vue'
import ToggleButton from '@/components/ToggleButton.vue'
import UnderlineSelect from '@/components/UnderlineSelect.vue'
import CalcPrice from '@/components/CalcPrice.vue'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { isGranted } from '@/api/UserApi'
import { PermissionName } from '@/enums/PermissionName'
import { userStore } from '@/stores/AuthStore'
import { ModuleName } from '@/enums/ModuleName'
import AddPeriod from '@/views/stocks/addPeriod.vue'
import RadioButton from '@/components/RadioButton.vue'
import { useRoute } from 'vue-router'
import { RouteName } from '@/enums/RouteName'
import router from '@/router'

const DefinitionsPanel = defineAsyncComponent({
  loader: () => import('@/views/definitions/DefinitionsPanel.vue'),
  delay: 200
})
const stock = ref<StockInterface>({ ...stockData })
const store = userStore()
const quantity = computed(() => {
  if (stock.value.unlimited) {
    return 0
  }
  return stock.value.quantity
})
const submit = async () => {
  const data = { ...stock.value }
  data.status = isGranted(PermissionName.stocks_save)
  data.primary = !!data.primary
  await updateStock(data).then((r) => {
    console.log(r)
    if (r.success) {
      router.push({ name: RouteName.stocks })
    }
  })
}
const route = useRoute()
onMounted(async () => {
  if (route.params.id) {
    stock.value = await getStock(route.params.id as string)
    stock.value.primary = stock.value.primary ? 1 : 0
  } else {
    router.push({ name: RouteName.stocks })
  }
})
</script>
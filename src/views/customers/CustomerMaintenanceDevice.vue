<template>
  <breadcrumb-view></breadcrumb-view>
  <div class="p-4 h-full relative">
    <h5 class="text-xl font-bold dark:text-white mb-4">Ahmet YILDIZ</h5>

    <div class="border border-gray-200 rounded-lg -mx-2 p-2 mb-4">
      <h5 class="text-lg dark:text-white">Cihaz Tanımlama</h5>
      <input-view v-model="device.name" placeholder="Ürün Adı"></input-view>
      <button>Buraya özellik ekle butonu gelecek.</button>
      <input-view
        v-model="device.maintenanceDate"
        placeholder="İşlem Tarihi"
        type="date"
      ></input-view>
      <add-period v-model="device.period"></add-period>
    </div>
    <div class="border border-gray-200 rounded-lg -mx-2 p-2">
      <div class="flex justify-between items-center py-2">
        <h5 class="text-lg dark:text-white">Periyodik Bakım Gerektiren Yedek Parçalar</h5>
        <button
          class="ml-1 h-6 w-6 flex items-center justify-center text-bold text-xl text-green-600 border border-green-600 rounded-full"
          role="button"
          @click="selectedParts.push({ ...stockData })"
        >
          <i class="vuu-plus"></i>
        </button>
      </div>

      <div v-for="(part, i) in selectedParts" :key="i" class="my-4 -mx-2 px-2 bg-gray-50">
        <div class="flex items-center">
          <underline-select
            v-model="selectedParts[i]"
            class="flex-1"
            placeholder="Yedek Parça"
            @change="selectedPart(i)"
          >
            <option v-for="item in parts" :key="item.name" :value="item">
              {{ item.name }}
            </option>
          </underline-select>
          <div><i class="vuu-delete cursor-pointer" @click="deletePart(i)"></i></div>
        </div>
        <underline-select
          v-if="selectedParts[i].sellingPrices.length > 0"
          v-model="partPrice[i]"
          :disabled="selectedParts[i].sellingPrices.length == 1"
          placeholder="Satış Fiyatı"
        >
          <option v-for="(price, j) in selectedParts[i].sellingPrices" :key="j" :value="price">
            {{ getPrice(price) }}
          </option>
        </underline-select>
        <!-- // TODO Satış fiyatı yoksa satış fiyatı eklemek için input koyucaz calc price -->
        <input-view
          v-model="partPeriod[i]"
          :placeholder="
            'Bir Sonraki Bakım Tarihi (' +
            (dayjs(partPeriod[i]).diff(Date.now(), 'day') + 1) +
            ' Gün)'
          "
          type="date"
          @change="setNotFoundPeriodPart(i)"
        ></input-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import BreadcrumbView from '@/components/BreadcrumbView.vue'
import { onMounted, ref } from 'vue'
import InputView from '@/components/InputView.vue'
import type { DeviceInterface } from '@/api/CustomersApi'
import dayjs from 'dayjs'
import type { PriceInterface, StockInterface } from '@/api/StockApi'
import { getParts, stockData } from '@/api/StockApi'
import AddPeriod from '@/views/stocks/addPeriod.vue'
import UnderlineSelect from '@/components/UnderlineSelect.vue'

const device = ref<DeviceInterface>({
  name: null,
  period: null,
  maintenanceDate: dayjs(Date.now()).format('YYYY-MM-DD'),
  parts: [],
  properties: []
})
const parts = ref<StockInterface[]>()
const selectedParts = ref<StockInterface[]>([])
const partPrice = ref<PriceInterface[]>([])
const partPeriod = ref<string[]>([])
const selectedPart = (i: number) => {
  if (
    selectedParts.value[i].sellingPrices.length == 1 ||
    selectedParts.value[i].sellingPrices.length > 0
  ) {
    partPrice.value[i] = selectedParts.value[i].sellingPrices[0]
  }
  if (selectedParts.value[i].period) {
    partPeriod.value[i] = dayjs(Date.now())
      .add(selectedParts.value[i].period as number, 'day')
      .format('YYYY-MM-DD')
  } else {
    partPeriod.value[i] = dayjs(Date.now()).format('YYYY-MM-DD')
  }
}
const deletePart = (i: number) => {
  selectedParts.value = selectedParts.value.filter((x, j) => i !== j)
  partPrice.value = partPrice.value.filter((x, j) => i !== j)
}
const setNotFoundPeriodPart = (i: number) => {
  selectedParts.value[i].period = dayjs(partPeriod.value[i]).diff(Date.now(), 'day') + 1
  console.log(selectedParts.value[i])
}
const getPrice = (price: PriceInterface) => {
  let priceText = ''
  if (price.price && price.tax_rate) {
    if (price.vat_exempt) {
      priceText +=
        price.price -
        (price.price * price.tax_rate) / 100 +
        ` ${price.currency} + ` +
        +((price.price * price.tax_rate) / 100) +
        ' KDV '
    } else {
      priceText +=
        `${price.price} ${price.currency} + ` + (price.price * price.tax_rate) / 100 + ' KDV '
    }
  }
  if (price.name) {
    priceText += `(${price.name})`
  }
  return priceText
}
onMounted(async () => {
  parts.value = await getParts()
})
</script>
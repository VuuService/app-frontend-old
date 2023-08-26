<template>
  <breadcrumb-view></breadcrumb-view>
  <div class="p-4 relative min-h-screen">
    <h5 class="text-xl font-bold dark:text-white mb-4">Ahmet YILDIZ</h5>

    <div class="border border-gray-200 rounded-lg -mx-2 p-2 mb-4">
      <div>
        <h5 class="text-lg dark:text-white">Cihaz Tanımlama</h5>
        <p class="text-sm text-red-600">
          Cihazın kendisine bir periyodik bakım uygulanacaksa lütfen bir periyot ekleyin.
        </p>
      </div>
      <input-view v-model="device.name" placeholder="Ürün Adı"></input-view>
      <definitions-panel
        v-model="device.properties"
        :module="ModuleName.stocks"
        static
      ></definitions-panel>
      <input-view
        v-model="device.maintenanceDate"
        placeholder="İşlem Tarihi"
        type="date"
      ></input-view>
      <add-period
        :model-value="{
          period: device.period?.period as string,
          dateType: device.period?.dateType as UnitTypeLong
        }"
        @update:modelValue="(v) => (device.period = v)"
      ></add-period>
    </div>
    <div class="border border-gray-200 rounded-lg -mx-2 p-2">
      <div class="flex justify-between items-center py-2">
        <div>
          <h5 class="text-lg dark:text-white">Periyodik Bakım Gerektiren Yedek Parçalar</h5>
          <p class="text-sm text-red-600">
            Lütfen Periyodik bakım gerektiren tüm yedek parçaları ekleyin. Aksi Takdirde doğru
            hatırlatmayı alamazsınız.
          </p>
        </div>
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
          <underline-select v-model="selectedParts[i]" class="flex-1" placeholder="Yedek Parça">
            <option v-for="item in parts" :key="item.name" :value="item">
              {{ item.name }}
            </option>
          </underline-select>
          <button @click="deletePart(i)"><i class="vuu-delete cursor-pointer"></i></button>
        </div>
        <add-period v-model="part.period"></add-period>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import BreadcrumbView from '@/components/BreadcrumbView.vue'
import { onMounted, ref } from 'vue'
import InputView from '@/components/InputView.vue'
import type { StockInterface } from '@/api/StockApi'
import { getParts, stockData } from '@/api/StockApi'
import UnderlineSelect from '@/components/UnderlineSelect.vue'
import type { DeviceInterface } from '@/api/CustomersApi'
import { ModuleName } from '@/enums/ModuleName'
import DefinitionsPanel from '@/views/definitions/DefinitionsPanel.vue'
import dayjs, { type UnitTypeLong } from 'dayjs'
import AddPeriod from '@/views/stocks/addPeriod.vue'

const device = ref<DeviceInterface>({
  properties: [],
  period: null,
  parts: [],
  maintenanceDate: null,
  name: null
})
const parts = ref<StockInterface[]>()
const selectedParts = ref<StockInterface[]>([])

function deletePart(i: number) {
  selectedParts.value = selectedParts.value.filter((x, j) => j != i)
}

onMounted(async () => {
  parts.value = await getParts()
  device.value.maintenanceDate = dayjs().format('YYYY-MM-DD')
})
</script>

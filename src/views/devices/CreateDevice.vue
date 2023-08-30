<template>
  <breadcrumb-view></breadcrumb-view>
  <div class="p-4 relative min-h-screen">
    <h5 class="text-xl font-bold dark:text-white mb-4">{{ customerFullName }}</h5>
    <form @submit.prevent="submit">
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

        <add-period
          :model-value="device.period"
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

        <div v-for="(part, i) in selectedParts" :key="i" class="my-4 -mx-2 px-2 bg-gray-40">
          <div class="flex items-center">
            <underline-select v-model="selectedParts[i]" class="flex-1" placeholder="Yedek Parça">
              <option v-for="item in parts" :key="item.name" :value="item">
                {{ item.name }}
              </option>
            </underline-select>
            <button @click="deletePart(i)"><i class="vuu-delete cursor-pointer"></i></button>
          </div>
          <add-period
            :model-value="part.period"
            @update:modelValue="(v) => (part.period = v)"
          ></add-period>
        </div>
      </div>
      <button
        class="mt-4 w-full py-2.5 px-4 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        type="submit"
      >
        Kaydet Devam et
      </button>
    </form>
  </div>
</template>
<script lang="ts" setup>
import BreadcrumbView from '@/components/BreadcrumbView.vue'
import { onMounted, ref } from 'vue'
import InputView from '@/components/InputView.vue'
import type { StockInterface } from '@/api/StockApi'
import { getParts, stockData } from '@/api/StockApi'
import UnderlineSelect from '@/components/UnderlineSelect.vue'
import { ModuleName } from '@/enums/ModuleName'
import DefinitionsPanel from '@/views/definitions/DefinitionsPanel.vue'
import AddPeriod from '@/views/stocks/addPeriod.vue'
import { useRoute } from 'vue-router'
import { createDevices, deviceData, type DeviceInterface } from '@/api/DeviceApi'
import router from '@/router'
import { RouteName } from '@/enums/RouteName'

const customerFullName = ref<string>()
const device = ref<DeviceInterface>({ ...deviceData })
const parts = ref<StockInterface[]>()
const selectedParts = ref<StockInterface[]>([])

function deletePart(i: number) {
  selectedParts.value = selectedParts.value.filter((x, j) => j != i)
}

async function submit() {
  device.value.parts = selectedParts.value.map((x) => {
    const { period, name } = x
    return { period, name }
  })
  device.value.customer = route.params.id as string
  await createDevices(device.value).then((r) => {
    if (r.success) {
      router.push({
        name: RouteName.customers_details,
        params: { id: route.params.id as string, fullName: route.params.fullName }
      })
    }
  })
}

const route = useRoute()
onMounted(async () => {
  parts.value = await getParts()
  customerFullName.value = route.params?.fullName.toString().replace('-', ' ')
})
</script>
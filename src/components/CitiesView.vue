<template>
  <underline-select v-model="address.province" placeholder="Şehir" @change="getCity">
    <option disabled selected value="0">Şehir Seçin</option>
    <option v-for="city in cities" :key="city.id" :value="city.name">
      {{ city.name }}
    </option>
  </underline-select>
  <underline-select
    v-if="district.length > 0"
    v-model="address.district"
    placeholder="İlçe"
    @change="getDistrict"
  >
    <option disabled selected value="null">İlçe Seçin</option>
    <option v-for="d in district" :key="d.name" :value="d.name">
      {{ d.name }}
    </option>
  </underline-select>
  <underline-select
    v-if="town.length > 0"
    v-model="address.town"
    placeholder="Belde"
    @change="getNeighbourhoods"
  >
    <option :value="null" selected>Belde Seçin</option>
    <option v-for="t in town" :key="t" :value="t.name">{{ t.name }}</option>
  </underline-select>
  <underline-select
    v-if="neighbourhood.length > 0 && address.village == null"
    v-model="address.neighbourhood"
    placeholder="Mahalle"
  >
    <option :value="null" selected>Mahalle Seçin</option>
    <option v-for="n in neighbourhood" :key="n.name" :value="n.name">{{ n.name }}</option>
  </underline-select>
  <underline-select
    v-if="village.length > 0 && address.neighbourhood == null"
    v-model="address.village"
    placeholder="Köy"
  >
    <option :value="null" selected>Köy Seçin</option>
    <option v-for="v in village" :key="v.name" :value="v.name">{{ v.name }}</option>
  </underline-select>
  <alert-banner
    v-if="successgetCordinate"
    class="mt-4"
    message="Konum alma başarılı!"
    @hidden="(v) => (successgetCordinate = v)"
  ></alert-banner>
  <div class="grid grid-cols-1 py-2">
    <button
      class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      type="button"
      @click="getCoordinate"
    >
      <i class="vuu-map-marker"></i>Konum
    </button>
  </div>
</template>
<script lang="ts" setup>
import UnderlineSelect from '@/components/UnderlineSelect.vue'
import { computed, onMounted, ref } from 'vue'
import { getCities } from '@/utils/address'
import AlertBanner from '@/components/AlertBanner.vue'
import type { AddressInterface } from '@/api/CustomersApi'

const cities = ref<{ id: number; name: string }[]>([])

const getCity = async () => {
  const city = cities.value.findIndex((x) => x.name === address.value.province)
  if (city) {
    district.value = []
    district.value = await getCities(cities.value[city].id).then((r) => r.district)
    town.value = []
    address.value.town = null
    neighbourhood.value = []
    address.value.neighbourhood = null
    village.value = []
    address.value.village = null
  }
}
const district = ref<any[]>([])
const neighbourhood = ref<any[]>([])
const town = ref<any[]>([])
const village = ref<any[]>([])
const getDistrict = () => {
  const temp = district.value.find((x) => x.name === address.value.district)
  town.value = []
  address.value.town = null
  neighbourhood.value = []
  address.value.neighbourhood = null
  village.value = []
  address.value.village = null

  if (temp?.neighborhood) {
    console.log('neighborhood a girdi')
    temp.neighborhood.map((x: any) => neighbourhood.value.push(x))
  }
  if (temp?.town) {
    temp.town.map((x: any) => town.value.push(x))
  }
  if (temp?.village) {
    temp.village.map((x: any) => village.value.push(x))
  }
}
const getNeighbourhoods = () => {
  const temp = town.value.find((x) => x.name === address.value.town)
  if (temp?.neighbourhood) {
    neighbourhood.value = []
    temp.neighbourhood.map((x: any) => neighbourhood.value.push(x))
  }
}

const successgetCordinate = ref<boolean>(false)

const getCoordinate = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      address.value.coordinate = { latitude, longitude }
      successgetCordinate.value = true
    })
  }
}

interface Props {
  modelValue: AddressInterface
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['update:modelValue'])

const address = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    console.log(value)
    return emit('update:modelValue', value)
  }
})
onMounted(async () => {
  cities.value = await getCities(0)
  address.value.province = 0
})
</script>
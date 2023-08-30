<template>
  <div v-if="customer" class="px-4 mb-4">
    <div class="flex justify-between items-center text-2xl mb-4">
      <router-link :to="{ name: RouteName.customers }"><i class="vuu-back-arrow"></i></router-link>
      <div>
        <i class="vuu-pencil-outline px-2"></i>
        <button id="dropdownButton" data-dropdown-toggle="dropdown" type="button">
          <i class="vuu-ellipsis-vert pl-2"></i>
        </button>
        <div
          id="dropdown"
          class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul aria-labelledby="dropdownButton" class="py-2">
            <li>
              <router-link
                :to="{
                  name: RouteName.customers_update,
                  params: {
                    fullname: customer.firstName + '-' + customer.lastName,
                    id: customer._id
                  }
                }"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >Düzenle
              </router-link>
            </li>
            <li>
              <a
                class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                role="button"
                @click="modal?.show()"
                >Sil</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <p
      :style="customerNameBackColor()"
      class="h-36 w-36 mx-auto my-4 flex justify-center items-center text-8xl text-white border rounded-full"
    >
      {{ route.params.fullName.toString().slice(0, 1).toUpperCase() }}
    </p>

    <h1 class="mx-auto text-center text-3xl capitalize">
      {{ route.params.fullName.toString().replace('-', ' ') }}
    </h1>

    <div v-if="customer" class="flex justify-around items-center mt-4">
      <a :href="'tel:+90' + customer.phone" class="flex flex-col items-center">
        <div class="border border-gray-100 bg-blue-100 rounded-full p-2 mb-2">
          <i class="vuu-phone-outline text-2xl"></i>
        </div>
        Telefon Et
      </a>
      <a
        :href="(isMobile() ? 'whatsapp://' : 'https://web.whatsapp.com/') + '+90' + customer.phone"
        class="flex flex-col items-center"
        target="_blank"
      >
        <div class="border border-gray-100 bg-blue-100 rounded-full p-2 mb-2">
          <i class="vuu-whatsapp text-2xl"></i>
        </div>
        Whatsapp
      </a>
      <a
        v-if="customer?.address?.coordinate"
        :href="
          'https://www.google.com.tr/maps/place/' +
          customer.address.coordinate.latitude +
          ',' +
          customer.address.coordinate.longitude
        "
        class="flex flex-col items-center"
        target="_blank"
      >
        <div class="border border-gray-100 bg-blue-100 rounded-full p-2 mb-2">
          <i class="vuu-routes text-2xl"></i>
        </div>
        Yol Tarifi
      </a>
    </div>
    <div v-if="customer" class="px-2 mt-4 bg-zinc-200 border rounded-lg">
      <h1 class="text-xl pl-1 py-2">İletişim Bilgileri</h1>
      <ul>
        <li class="py-2">
          <a :href="'tel:+90' + customer.phone" class="flex items-center">
            <i class="vuu-phone text-2xl pr-2"></i>
            +90{{ customer.phone }}
          </a>
        </li>
        <li v-if="customer.address" class="py-2">
          <a
            :href="
              customer.address.coordinate
                ? 'https://www.google.com.tr/maps/place/' +
                  customer.address.coordinate.latitude +
                  ',' +
                  customer.address.coordinate.longitude
                : '#'
            "
            :target="customer.address.coordinate ? '_blank' : '_self'"
            class="flex items-center flex-wrap capitalize"
          >
            <i class="vuu-map-marker-outline text-2xl pr-2"></i>
            <span v-if="customer.address.province">
              {{ customer.address?.province.toString().toLocaleLowerCase('tr') }}
            </span>
            <span v-if="customer.address.district">
              &nbsp; / {{ customer.address.district.toString().toLocaleLowerCase('tr') }}
            </span>
            <span v-if="customer.address.town">
              &nbsp; / {{ customer.address.town.toString().toLocaleLowerCase('tr') }} Beldesi
            </span>
            <span v-if="customer.address.neighbourhood">
              &nbsp; / {{ customer.address.neighbourhood.toString().toLocaleLowerCase('tr') }} Mah.
            </span>
            <span v-if="customer.address.village">
              &nbsp; / {{ customer.address.village.toString().toLocaleLowerCase('tr') }} Köy.
            </span>
          </a>
        </li>
      </ul>
    </div>
    <div class="mt-4">
      <h2 class="text-xl p-2">Cihazlar</h2>
      <ul>
        <li>
          <router-link
            :to="{
              name: RouteName.devices_create,
              params: { fullName: $route.params.fullName, id: customer._id }
            }"
            class="flex items-center space-x-4 cursor-pointer py-3 sm:py-4 px-4"
          >
            <div class="flex-shrink-0">
              <div
                class="relative bg-gray-100 rounded-full h-12 w-12 overflow-hidden flex items-center justify-center"
              >
                <i class="vuu-box-add text-gray-400 text-4xl m-0 before:!m-0"></i>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium break-words text-gray-900 truncate dark:text-white">
                Yeni Cihaz Ekle
              </p>
            </div>
            <div
              class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
            >
              <i class="vuu-right-arrow text-xl"></i>
            </div>
          </router-link>
        </li>
        <li v-for="device in devices" :key="device._id" arrow>
          <ListAccordionItem>
            <template #left>
              <div
                class="relative bg-gray-100 rounded-full h-12 w-12 overflow-hidden flex items-center justify-center"
              >
                <i class="absolute top-2 vuu-box text-4xl"></i>
              </div>
            </template>
            <template #middle
              ><h2 class="font-medium">{{ device.name }}</h2></template
            >
          </ListAccordionItem>
        </li>
      </ul>
    </div>
    <static-modal @modal="(v) => (modal = v)">
      <template #header
        ><span class="text-red-600">Silmek istediğinize emin misiniz ?</span></template
      >
      <template #default
        >{{ customer.firstName }} {{ customer.lastName }} isimli müşteriyi silmek istediğinize emin
        misiniz?
      </template>
      <template #footer>
        <div class="flex justify-end w-full">
          <button
            class="text-white bg-red-600 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
            @click="modal?.hide()"
          >
            Vazgeç
          </button>
          <button
            class="text-red-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
            @click="deleteCustomer"
          >
            Sil
          </button>
        </div>
      </template>
    </static-modal>
  </div>
</template>
<script lang="ts" setup>
import { RouteName } from '@/enums/RouteName'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { randomInt } from '@/utils/math'
import type { CustomerInterface } from '@/api/CustomersApi'
import { destroyCustomer, getCustomer } from '@/api/CustomersApi'
import { isMobile } from '@/api/BrowserApi'
import type { DeviceInterface } from '@/api/DeviceApi'
import { getDevices } from '@/api/DeviceApi'
import ListAccordionItem from '@/components/ListAccordionItem.vue'
import router from '@/router'
import {
  Dropdown,
  type DropdownInterface,
  type DropdownOptions,
  type ModalInterface
} from 'flowbite'
import StaticModal from '@/components/StaticModal.vue'

const route = useRoute()
const customer = ref<CustomerInterface>()
const devices = ref<DeviceInterface[]>([])

const modal = ref<ModalInterface>()

function customerNameBackColor() {
  const colorArray = ['#6002ee', '#90ee02', '#021aee', '#d602ee', '#ee0290', '#ee6002']
  return `background-color:${colorArray[randomInt(0, colorArray.length)]};`
}

const deleteCustomer = () => {
  if (customer.value?._id) {
    destroyCustomer(customer.value._id).then(() => {
      modal.value?.hide()
      router.push({ name: RouteName.customers })
    })
  }
}

const menu = ref<HTMLElement>()
const button = ref<HTMLElement>()
const dropdown = ref<DropdownInterface>()
onMounted(async () => {
  if (route.params.id) {
    customer.value = await getCustomer(route.params.id as string)
    devices.value = await getDevices(route.params.id as string)
  } else {
    router.push({ name: RouteName.customers })
  }
  const options: DropdownOptions = {
    placement: 'bottom',
    triggerType: 'click',
    offsetSkidding: 0,
    offsetDistance: 10,
    delay: 300
  }

  menu.value = document.getElementById('dropdown') || undefined
  button.value = document.getElementById('dropdownButton') || undefined
  dropdown.value = new Dropdown(menu.value, button.value, options)
})
</script>
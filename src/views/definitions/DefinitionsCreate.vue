<template>
  <breadcrumb-view></breadcrumb-view>
  <div class="px-4 py-4">
    <div class="relative z-0 w-full mb-6 group">
      <input
        id="floating_email"
        v-model="key"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        name="floating_email"
        placeholder=" "
        required
        type="text"
      />
      <label
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        for="floating_email"
        >Özellik adı</label
      >
    </div>

    <div class="pb-4">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="type"
        >Özellik tipi</label
      >
      <select
        id="type"
        v-model="type"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option disabled selected>Tip seçin</option>
        <option value="text">Metin</option>
        <option value="number">Sayı</option>
        <option value="date">Tarih</option>
        <option value="toggle">Doğru/Yanlış</option>
        <option value="select">Seçim</option>
        <option value="checkbox">Çoklu seçim</option>
      </select>
    </div>

    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click.prevent="submit"
    >
      Kaydet
    </button>
  </div>
</template>
<script lang="ts" setup>
import BreadcrumbView from '@/components/BreadcrumbView.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { AddDefinitionFn } from '@/api/definitionApi'
import { RouteName } from '@/enums/RouteName'

const route = useRoute()
const router = useRouter()

const type = ref()
const key = ref()

function submit() {
  AddDefinitionFn(route.query.type, key.value, type.value).then(() => {
    router.push({ name: RouteName.definitions, query: { type: route.query.type } })
  })
}
</script>

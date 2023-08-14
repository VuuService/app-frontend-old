<template>
  <breadcrumb-view></breadcrumb-view>
  <form @submit.prevent="submit">
    <div class="px-4 py-4">
      <input-view
        v-model="definition.key"
        placeholder="Tanım adı"
        required
        type="text"
      ></input-view>

      <label class="sr-only mb-4" for="underline_select">Tanım tipi</label>
      <select
        id="underline_select"
        v-model="definition.type"
        class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        required
      >
        <option disabled selected>Tip seçin</option>
        <option value="text">Metin</option>
        <option value="number">Sayı</option>
        <option value="date">Tarih</option>
        <option value="toggle">Doğru/Yanlış</option>
        <option value="select">Seçim</option>
        <option value="checkbox">Çoklu seçim</option>
      </select>
      <div class="flex items-center my-4">
        <input
          id="default-checkbox"
          v-model="definition.static"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          type="checkbox"
        />
        <label
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          for="default-checkbox"
          >Sürekli gözüksün mü?</label
        >
      </div>
      <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click.prevent="submit"
      >
        Kaydet
      </button>
    </div>
  </form>
</template>
<script lang="ts" setup>
import BreadcrumbView from '@/components/BreadcrumbView.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ModuleName } from '@/enums/ModuleName'
import router from '@/router'
import InputView from '@/components/InputView.vue'
import { createDefinition, definition } from '@/api/DefinitionsApi'
import { userStore } from '@/stores/AuthStore'
import { RouteName } from '@/enums/RouteName'

const route = useRoute()
const { company } = userStore()

async function submit() {
  console.log(definition.value)
  await createDefinition(definition.value).then((r) => {
    r.success
      ? router.push({ name: RouteName.definitions, params: { module: route.params.module } })
      : console.log(r.message)
  })
}

onMounted(() => {
  if (!Object.keys(ModuleName).includes(route.params.module as string)) {
    router.push('/')
  } else {
    definition.value.company = company?._id as string
    definition.value.module = route.params.module as string
  }
})
</script>

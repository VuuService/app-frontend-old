<template>
  <form class="px-4">
    <input-view
      v-model="data.amount"
      :placeholder="'İşlem tutarı'"
      :value="data.amount"
      type="number"
    ></input-view>
    <div class="mt-4">
      <label class="sr-only" for="underline_select">Ödeme şekli</label>
      <select
        id="underline_select"
        class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
      >
        <option class="hidden" selected>Ödeme şekli</option>
        <option value="cash">Nakit</option>
        <option value="credit_card">Kredi Kartı</option>
        <option value="eft">Havale/EFT</option>
      </select>
      <!-- //TODO Searchable gibi select yapılacak -->
    </div>
    <input-view
      v-if="data.amount && data.amount > 0"
      v-model="data.deposit"
      :max="data.amount"
      placeholder="Alınan Peşinat"
      title="Alınan peşinat işlem tutarından yüksek olamaz."
      type="number"
    ></input-view>
    <div v-if="balance > 0" class="relative">
      <input-view :value="balance" disabled placeholder="Kalan tutar"></input-view>
      <button class="inline-flex items-center absolute top-0 right-0" type="button">
        <small>Taksitlendir</small><i class="vuu-account text-2xl"></i>
      </button>
    </div>

    <button class="mt-10" type="submit">Tıkla</button>
  </form>
</template>
<script lang="ts" setup>
import InputView from '@/components/InputView.vue'
import { computed, ref } from 'vue'

const data = ref<{ amount: number | null; deposit: number }>({ amount: null, deposit: 0 })
const balance = computed(() => {
  let { amount, deposit } = data.value

  if (amount == null) {
    return 0
  }
  return amount - deposit
})
</script>
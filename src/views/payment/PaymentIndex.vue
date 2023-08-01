<template>
  <form class="px-4">
    <div class="relative">
      <input-view
        v-model="data.amount"
        :placeholder="'İşlem tutarı'"
        :value="data.amount"
        type="number"
      ></input-view>
    </div>

    <div class="mt-4">
      <label class="sr-only" for="underline_select">Ödeme şekli</label>
      <select
        id="underline_select"
        class="block py-2.5 px-0 active:px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
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
      <button
        class="inline-flex items-center absolute top-0 right-0"
        type="button"
        @click="isInstallment = !isInstallment"
      >
        <small>Taksitlendir</small><i class="vuu-account text-2xl"></i>
      </button>
    </div>
    <div v-if="isInstallment" class="my-4 shadow">
      <h4 class="text-xl font-bold dark:text-white">Taksit Bilgisi</h4>
      <input-view
        v-model="installment.installment_count"
        :max="120"
        placeholder="Taksit Sayısı"
        type="number"
        @focusout="calcInstallment()"
      ></input-view>
      <div class="relative">
        <input-view
          v-model="installment.montly_interest_rate"
          placeholder="Faiz Oranı (%)"
        ></input-view>
        <div class="absolute right-0 top-0">
          <label class="relative inline-flex items-center mb-5 cursor-pointer">
            <input v-model="camulative" class="sr-only peer" type="checkbox" />
            <div
              class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Kamülatif</span>
          </label>
        </div>
      </div>
      <div
        v-for="(item, i) in installment.table"
        :key="i"
        class="grid gap-6 grid-cols-2 flex items-center"
      >
        <input-view v-model="item.amount" :placeholder="i + 1 + '. Taksit'"></input-view>
        <input-view v-model="item.date" placeholder="Tarih" type="date"></input-view>
      </div>
    </div>

    <button class="mt-10" type="submit">Tıkla</button>
  </form>
</template>
<script lang="ts" setup>
import InputView from '@/components/InputView.vue'
import { computed, ref } from 'vue'
import dayjs from 'dayjs'

const data = ref<{ amount: number | null; deposit: number }>({ amount: 1500, deposit: 0 })
const isInstallment = ref<boolean>(false)
const installment = ref<{
  installment_count?: number | null
  montly_interest_rate: number | null
  table: { amount: number; date: string }[]
}>({ installment_count: null, montly_interest_rate: null, table: [] })

const camulative = ref<boolean>(true)
const balance = computed(() => {
  let { amount, deposit } = data.value

  if (amount == null) {
    return 0
  }
  return amount - deposit
})

function calcInstallment() {
  const { installment_count } = installment.value
  if (installment_count && installment_count > 0) {
    const now = Date.now()
    installment.value.table = []
    /*
     * eğer ki kamulatif seçiliyse kamulatif faizli fiyatı hesaplayıp ilgili aya böldüreceğiz.
     * seçili değilse ki default olarak kamülatif seçili olsun.
     * direk kalan tutara %faiz uygulayıp ilgili aya bölelim.
     * */
    for (let i = 0; i < installment_count; i += 1) {
      installment.value.table.push({
        amount: balance.value / installment_count,
        date: dayjs(now).add(i, 'month').format('YYYY-MM-DD')
      })
    }
  }
}
</script>
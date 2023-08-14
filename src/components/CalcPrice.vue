<template>
  <a class="block -mx-4 mt-4 px-4 bg-white">
    <h5
      class="flex items-center mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white"
    >
      {{ name }} fiyatı
      <span
        class="cursor-pointer text-green-600 flex items-center justify-center ml-2 w-5 h-5 border border-green-600 rounded-full"
        @click="model.push({ price: null, name: null, tax_rate: null, currency: 'TL' })"
        ><i class="vuu-plus"></i
      ></span>
    </h5>
    <div
      v-for="(price, i) in model"
      :key="i"
      class="relative my-4 -mx-4 px-4 shadow-blue-500/50 bg-gray-100"
    >
      <div class="flex xs:flex-col">
        <underline-select
          v-model="price.currency"
          class="xs:w-full sm:w-1/3"
          placeholder="Para Birimi"
        >
          <option v-for="item in ['TL', 'USD', 'EUR']" :key="item" :value="item">{{ item }}</option>
        </underline-select>
        <div class="relative">
          <input-view
            v-model="price.price"
            :placeholder="i + 1 + '. ' + name + ' Fiyatı' + ` (${price?.currency})`"
            class="sm:flex-1"
            type="number"
          ></input-view>
        </div>

        <div class="relative">
          <input-view
            :placeholder="
              tax[i] ? 'KDV Hariç' + ` (${price?.currency})` : 'KDV Dahil' + ` (${price?.currency})`
            "
            :value="getPrice(i)"
            class="sm:flex-1"
            disabled
          ></input-view>
        </div>
      </div>
      <input-view
        v-model="price.name"
        :placeholder="i + 1 + '. ' + name + ' Fiyat Adı'"
        type="text"
      ></input-view>
      <div class="flex">
        <input-view
          v-model="price.tax_rate"
          :placeholder="i + 1 + '. ' + props.name + ' Fiyatı Vergi Oranı'"
          type="number"
        ></input-view>
        <toggle-button
          v-model="tax[i]"
          :placeholder="tax[i] ? 'KDV dahil' : 'KDV hariç'"
        ></toggle-button>
      </div>
      <i
        class="vuu-delete-outline text-lg absolute top-1/2 right-4 text-red-800 cursor-pointer"
        @click="model = model.filter((x, j) => i != j)"
      ></i>
    </div>
  </a>
</template>
<script lang="ts" setup>
import { type PriceInterface } from '@/api/StockApi'
import ToggleButton from '@/components/ToggleButton.vue'
import InputView from '@/components/InputView.vue'
import { computed, ref } from 'vue'
import UnderlineSelect from '@/components/UnderlineSelect.vue'

interface Props {
  modelValue: PriceInterface[]
  name: string
}

const props = withDefaults(defineProps<Props>(), {})
const tax = ref<boolean[]>([])

const calcPrice = (price: PriceInterface, tax: boolean) => {
  if (price.price && price.tax_rate) {
    if (tax) {
      return price.price - (price.price * price.tax_rate) / 100 || 0
    }
    return price.price + (price.price * price.tax_rate) / 100 || 0
  }
}
const getPrice = computed(() => (i: number) => {
  const calced = calcPrice(model.value[i], tax.value[i])
  return calced && calced > 0 ? calced : 0
})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    return emit('update:modelValue', value)
  }
})
</script>

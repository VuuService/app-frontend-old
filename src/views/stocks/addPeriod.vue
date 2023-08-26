<template>
  <button
    v-if="!props.modelValue || !model?.dateType"
    class="mt-4 w-full py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    type="button"
    @click="addPeriod"
  >
    <i class="vuu-plus"></i>
    Periyot ekle
  </button>
  <div v-if="model?.dateType" class="grid grid-cols-2">
    <input-view
      v-model="model.period"
      pattern="[0-9]+([,.][0-9]{1,2})?"
      placeholder="Periyot süresi"
      selectAll
      type="text"
      v-on:focusout="valid()"
    ></input-view>
    <underline-select
      v-model="model.dateType"
      placeholder="Periyot Aralığı"
      @change="dateType = model.dateType as UnitTypeLong"
    >
      <option v-for="item in Object.values(timeType) as UnitTypeLong[]" :key="item" :value="item">
        {{ t(item) }}
      </option>
    </underline-select>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import InputView from '@/components/InputView.vue'
import UnderlineSelect from '@/components/UnderlineSelect.vue'
import { timeType } from '@/enums/Date'
import dayjs, { type UnitTypeLong } from 'dayjs'
import duration, { type DurationUnitType } from 'dayjs/plugin/duration'
import { useI18n } from 'vue-i18n'

dayjs.extend(duration)

const { t } = useI18n()
const valid = () => {
  if (model.value?.period) {
    model.value.period = model.value.period.toString().replace(',', '.') as string
  }
}

interface Props {
  modelValue: { dateType: UnitTypeLong; period: string } | null
}

function addPeriod() {
  model.value = { dateType: timeType.day, period: '' }
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['update:modelValue'])

const dateType = ref<UnitTypeLong>()
const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    return emit('update:modelValue', value)
  }
})

function calcPeriodValue(newValue: DurationUnitType, oldValue: DurationUnitType) {
  if (model.value?.period) {
    const period = parseFloat(model.value.period)
    const millisecond = dayjs.duration(period, oldValue).asMilliseconds()
    const durationObject = dayjs.duration(millisecond, 'millisecond')
    switch (newValue) {
      case timeType.second:
        model.value.period = durationObject.asSeconds().toFixed(2).toString()
        break
      case timeType.minute:
        model.value.period = durationObject.asMinutes().toFixed(2).toString()
        break
      case timeType.hour:
        model.value.period = durationObject.asHours().toFixed(2).toString()
        break
      case timeType.day:
        model.value.period = durationObject.asDays().toFixed(2).toString()
        break
      case timeType.week:
        model.value.period = durationObject.asWeeks().toFixed(2).toString()
        break
      case timeType.month:
        model.value.period = durationObject.asMonths().toFixed(2).toString()
        break
      case timeType.year:
        model.value.period = durationObject.asYears().toFixed(2).toString()
        break
      default:
        model.value.period = millisecond.toString()
    }
  }
}

watch(dateType, (newValue, oldValue) => {
  newValue = newValue ? newValue : (timeType.day as UnitTypeLong)
  oldValue = oldValue ? oldValue : (timeType.day as UnitTypeLong)
  calcPeriodValue(newValue as DurationUnitType, oldValue as DurationUnitType)
  console.log(model.value)
})
</script>
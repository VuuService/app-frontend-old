<template>
  <div
    v-for="(definition, i) in selectedDefinitions"
    :key="i"
    class="flex justify-between items-center relative"
  >
    <underline-select
      v-if="!definition._id"
      v-model="selectedDefinitions[i]"
      :class="{ 'w-1/3': !definition._id }"
      :placeholder="i + 1 + '. Özellik'"
    >
      <option v-for="definition in definitionsClone" :key="definition._id" :value="definition">
        {{ definition.key }}
      </option>
    </underline-select>
    <input-view
      v-model="definition.value"
      :placeholder="definition.key"
      :type="Object.values(InputType).find((x) => x === definition.type) ? definition.type : 'text'"
      class="flex-1"
    ></input-view>
    <div
      v-if="!definition._id"
      class="cursor-pointer absolute right-0 bottom-0"
      @click="deleteDefinition(i)"
    >
      <i class="vuu-delete"></i>
    </div>
  </div>
  <button
    class="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 my-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    type="button"
    @click="selectedDefinitions.push({ ...definition })"
  >
    <i class="vuu-plus"></i>Yeni özellik ekle
  </button>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import type { DefinitionInterface } from '@/api/DefinitionsApi'
import { definition, getDefinitions } from '@/api/DefinitionsApi'
import InputView from '@/components/InputView.vue'
import { InputType } from '@/enums/InputType'
import UnderlineSelect from '@/components/UnderlineSelect.vue'

const definitions = ref<DefinitionInterface[]>([])
const definitionsClone = ref<DefinitionInterface[]>([])

interface Props {
  module: string
  modelValue: DefinitionInterface[]
  static?: boolean
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['update:modelValue'])

function firstDataSet() {
  if (props.modelValue.length == 0) {
    selectedDefinitions.value = definitions.value.filter((x) => x.static)
  }
}

const selectedDefinitions = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    return emit('update:modelValue', value)
  }
})

function deleteDefinition(i: number) {
  selectedDefinitions.value = selectedDefinitions.value.filter((x, j) => i != j)
}

onMounted(async () => {
  await getDefinitions(props.module).then((definitionArray) => {
    definitions.value = definitionArray
    definitionsClone.value = definitionArray.map((x) => {
      const l = { ...x }
      delete l._id
      return l
    })
  })
  firstDataSet()
})
</script>

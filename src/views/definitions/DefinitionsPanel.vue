<template>
  <div
    v-for="(definition, i) in selectedDefinitions"
    :key="i"
    class="flex justify-between items-center relative"
  >
    <underline-select
      v-if="!definition.selectedDefinition?._id"
      v-model="definition.selectedDefinition"
      :class="{ 'w-1/3': !definition.selectedDefinition?._id }"
      :placeholder="i + 1 + '. Özellik'"
      @change="selectDefinition(i)"
    >
      <option v-for="definition in definitions" :key="definition._id" :value="definition._id">
        {{ definition.key }}
      </option>
    </underline-select>
    <input-view
      v-if="definition?.definition"
      v-model="definition.definition.value"
      :placeholder="definition.definition.key"
      :type="
        Object.values(InputType).find((x) => x === definition?.definition?.type)
          ? definition.definition.type
          : 'text'
      "
      class="flex-1"
    ></input-view>
    <div
      v-if="!definition.selectedDefinition?._id"
      class="absolute right-0 bottom-0"
      @click="deleteDefinition(i)"
    >
      <i class="vuu-delete"></i>
    </div>
  </div>
  <button
    v-if="definitions.length > 0"
    class="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 my-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    type="button"
    @click="selectedDefinitions.push({ selectedDefinition: null, definition: { ...definition } })"
  >
    <i class="vuu-plus"></i>Yeni özellik ekle
  </button>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import type { DefinitionInterface } from '@/api/DefinitionsApi'
import { definition, getDefinitions } from '@/api/DefinitionsApi'
import InputView from '@/components/InputView.vue'
import { InputType } from '@/enums/InputType'
import UnderlineSelect from '@/components/UnderlineSelect.vue'

const definitions = ref<DefinitionInterface[]>([])

interface Props {
  module: string
  properties: DefinitionInterface[]
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['update:modelValue'])

const selectedDefinitions = ref<
  { selectedDefinition: DefinitionInterface | null; definition?: DefinitionInterface }[]
>([])

function selectDefinition(i: number) {
  if (definitions.value.length > 0 && selectedDefinitions.value[i]?.selectedDefinition) {
    selectedDefinitions.value[i].definition = definitions.value.find(
      (x) => x._id === selectedDefinitions.value[i]?.selectedDefinition?.toString()
    )
  }
}

function getEmitData() {
  return selectedDefinitions.value
    .filter((x) => x?.definition)
    .map((x) => ({
      _id: x.definition?._id,
      key: x.definition?.key,
      value: x.definition?.value,
      type: x.definition?.type
    }))
}

function deleteDefinition(i: number) {
  selectedDefinitions.value = selectedDefinitions.value.filter((x, j) => i != j)
}

watch(
  selectedDefinitions,
  () => {
    emit('update:modelValue', getEmitData())
  },
  { deep: true }
)
const first = ref<boolean>(true)
watch(
  props,
  () => {
    if (first.value) {
      selectedDefinitions.value = props.properties.map((x) => ({
        selectedDefinition: x,
        definition: x
      }))
      const propertiesMutation = props.properties.map((x) => x._id)
      selectedDefinitions.value = selectedDefinitions.value.concat(
        definitions.value
          .filter((x) => x.static && !propertiesMutation.includes(x._id))
          .map((x) => ({
            selectedDefinition: x,
            definition: x
          }))
      )
      first.value = false
    }
  },
  { deep: true }
)
onMounted(async () => {
  definitions.value = await getDefinitions(props.module)
  if (first.value && props.properties.length == 0 && definitions.value.length > 0) {
    selectedDefinitions.value = definitions.value
      .filter((x) => x.static)
      .map((x) => ({
        selectedDefinition: { ...x },
        definition: { ...x }
      }))
  }
})
</script>
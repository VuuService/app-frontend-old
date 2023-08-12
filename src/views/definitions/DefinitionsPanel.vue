<template>
  <div
    v-for="(definition, i) in selectedDefinitions"
    :key="i"
    class="flex justify-between items-center relative"
  >
    <div class="mt-4">
      <label class="sr-only" for="underline_select">{{ i + 1 }}}. Özellik</label>
      <select
        v-if="!definition.selectedDefinition?._id"
        id="underline_select"
        v-model="definition.selectedDefinition"
        class="flex-1 pt-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        @change="selectDefinition(i)"
      >
        <option v-for="definition in definitions" :key="definition._id" :value="definition._id">
          {{ definition.key }}
        </option>
      </select>
    </div>
    <input-view
      v-if="definition?.definition"
      v-model="definition.definition.value"
      :placeholder="definition.definition.key"
      :type="
        Object.values(InputType).find((x) => x === definition?.definition?.type)
          ? definition.definition.type
          : 'text'
      "
    ></input-view>
    <div v-if="!definition.selectedDefinition?._id" class="absolute right-0 bottom-0">
      <i class="vuu-delete"></i>
    </div>
  </div>
  <button
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
  return selectedDefinitions.value.filter((x) => x?.definition).map((x) => x.definition)
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
})
</script>

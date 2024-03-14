<script setup>
const props = defineProps({
  modelValue: { type: String, required: true },
  countryCode: { type: String, required: true, default: "IE" },
})

const emit = defineEmits(["update:modelValue"])

const states = ref([])

function select(evt) {
  emit("update:modelValue", evt.target.value)
}

async function updateState() {
  try {
    const { countryStates } = await GqlGetStates({ country: props.countryCode })
    states.value = countryStates
  } catch (error) {
    console.error(error)
  }
}

watch(
  () => props.countryCode,
  () => {
    updateState()
  },
)

onMounted(() => {
  updateState()
})
</script>

<template>
  <select v-if="states.length" @change="select">
    <option
      v-for="state in states"
      :key="state.code"
      :value="state.code"
      :selected="state.code === props.modelValue"
    >
      {{ state.name }}
    </option>
  </select>
  <input v-else type="text" placeholder="State" @change="select" />
</template>

<style scoped lang="postcss">
select {
  height: 42px;
}
</style>

<script setup>
const { getFilter, setFilter, isFiltersActive } = useFiltering()
const selectedTerms = ref(getFilter("sale") || [])

const isOpen = ref(true)

watch(isFiltersActive, () => {
  // uncheck all radio boxes when filters are cleared
  if (!isFiltersActive.value) selectedTerms.value = []
})

const checkboxClicked = (e) => {
  if (selectedTerms.value.length === 0) {
    selectedTerms.value = [e.target.value]
    setFilter("sale", [e.target.value])
  } else {
    selectedTerms.value = []
    setFilter("sale", [])
  }
}
</script>

<template>
  <div>
    <div
      class="mt-8 flex items-center justify-between font-semibold leading-none"
      @click="isOpen = !isOpen"
    >
      <span>Sale Products Only</span>
      <Icon
        name="ion:chevron-down-outline"
        class="transform"
        :class="isOpen ? 'rotate-180' : ''"
      />
    </div>
    <div
      v-if="isOpen"
      class="custom-scrollbar mr-1 mt-3 grid max-h-[240px] gap-1 overflow-auto"
    >
      <div class="flex items-center gap-2">
        <label
          for="sale-true"
          class="sr-only m-0 cursor-pointer text-sm"
          aria-label="Only show products on sale"
        >
          Only show products on sale</label
        >
        <input
          id="sale-true"
          v-model="selectedTerms"
          type="checkbox"
          :value="true"
          aria-label="Sale Products Only"
          @click="checkboxClicked"
        />
      </div>
    </div>
  </div>
</template>

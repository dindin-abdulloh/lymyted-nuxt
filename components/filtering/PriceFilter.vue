<script setup>
import Slider from "@vueform/slider"

const { getFilter, setFilter, isFiltersActive } = useFiltering()
const runtimeConfig = useRuntimeConfig()
const maxPrice = runtimeConfig?.public?.MAX_PRICE || 1000
const activeFilters = ref(getFilter("price"))
const price = activeFilters.value.length
  ? ref(activeFilters.value)
  : ref([0, maxPrice])
const isOpen = ref(true)

const resetSlider = () => {
  price.value = [0, maxPrice]
}

const applyPrice = () => {
  setFilter("price", price.value)
}

watch(isFiltersActive, () => {
  if (!isFiltersActive.value) resetSlider()
})
</script>

<template>
  <div>
    <div
      class="mt-8 flex cursor-pointer items-center justify-between font-semibold leading-none"
      @click="isOpen = !isOpen"
    >
      <span>{{ $t("messages.shop.price") }}</span>
      <Icon
        name="ion:chevron-down-outline"
        class="transform"
        :class="isOpen ? 'rotate-180' : ''"
      />
    </div>
    <div v-show="isOpen" class="mt-3 grid grid-cols-2 gap-4">
      <div class="relative flex items-center">
        <input
          id="price-from"
          v-model="price[0]"
          class="w-auto max-w-full rounded-lg border border-slate-200 bg-white p-2 pl-6 leading-none md:text-sm"
          type="number"
          placeholder="From"
          min="0"
        />
        <label
          for="price-from"
          class="absolute px-2 leading-none text-slate-400"
          >€</label
        >
      </div>
      <div class="relative flex items-center">
        <input
          id="price-to"
          v-model="price[1]"
          class="w-auto max-w-full rounded-lg border border-slate-200 bg-white p-2 pl-6 leading-none md:text-sm"
          type="number"
          placeholder="Up to"
          min="1"
        />
        <label for="price-to" class="absolute px-2 leading-none text-slate-400"
          >€</label
        >
      </div>
      <div class="col-span-full mx-1 mt-1">
        <Slider
          v-model="price"
          :tooltips="false"
          :min="0"
          :max="maxPrice"
          aria-labelledby="price-from price-to"
          @change="applyPrice"
        />
      </div>
    </div>
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>

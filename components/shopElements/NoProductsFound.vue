<script setup lang="ts">
const { allProducts } = useProducts()
const { clearSearchQuery, isSearchActive } = useSearching()
const { resetFilter, isFiltersActive } = useFiltering()

const clearAll = () => {
  if (isFiltersActive.value) resetFilter()
  if (isSearchActive.value) clearSearchQuery()
}
</script>

<template>
  <div class="my-16 w-full lg:my-24">
    <div class="flex w-full flex-col items-center justify-center text-center">
      <Icon name="ion:sad-outline" size="156" class="mb-10 opacity-25" />
      <h2 class="text-2xl font-bold">No products found</h2>
      <p class="mt-4 max-w-xs">
        <slot
          >Try adjusting your search or filter to find what you're looking
          for.</slot
        >
      </p>
      <div>
        <button
          v-if="allProducts.length"
          class="mt-8 inline-block w-full rounded-lg bg-primary p-2 px-3 text-center text-sm font-bold text-white"
          title="Clear all filters and search"
          aria-label="Clear all filters and search"
          @click="clearAll"
        >
          Clear all
        </button>
      </div>
    </div>
  </div>
</template>

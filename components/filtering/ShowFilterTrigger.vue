<script setup>
const { toggleBodyClass, removeBodyClass } = useHelpers()
const { isFiltersActive } = await useFiltering()
onBeforeUnmount(() => {
  removeBodyClass("show-filters")
})
</script>

<template>
  <div class="rounded-m relative isolate inline-flex -space-x-px shadow-sm">
    <button
      class="relative inline-flex items-center rounded-md border border-slate-300 bg-white p-2 text-sm text-slate-500 hover:bg-slate-50 focus:z-20"
      aria-label="Show filters"
      title="Show filters"
      @click="toggleBodyClass('show-filters')"
    >
      <Icon
        name="ion:funnel-outline"
        size="18"
        class="transform-origin-center transform transition-transform"
      />
    </button>
    <span
      v-if="isFiltersActive"
      class="absolute -right-1 -top-1 z-20 h-2.5 w-2.5 rounded-full bg-primary"
    />
  </div>
</template>

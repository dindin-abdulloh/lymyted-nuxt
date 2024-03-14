<script setup>
const { getFilter, setFilter, isFiltersActive } = useFiltering()

const { filterSlug, label, hideEmpty, showCount, open } = defineProps({
  filterSlug: { type: String, default: "", required: true },
  label: { type: String, default: "" },
  hideEmpty: { type: Boolean, default: false },
  showCount: { type: Boolean, default: false },
  open: { type: Boolean, default: true },
})

const taxonomies = filterSlug.toUpperCase().replace("_", "")
const { data } = await useAsyncGql("getAllTerms", { taxonomies, hideEmpty })

const allPaTerms = data.value.terms?.nodes || []
const selectedTerms = ref(getFilter(filterSlug) || [])
const filterTitle = ref(label || filterSlug)

const isOpen = ref(open)

watch(isFiltersActive, () => {
  // uncheck all checkboxes when filters are cleared
  if (!isFiltersActive.value) selectedTerms.value = []
})

// Update the URL when the checkbox is changed
const checkboxChanged = () => {
  setFilter(filterSlug, selectedTerms.value)
}
</script>

<template>
  <div
    class="mt-8 flex cursor-pointer items-center justify-between font-semibold leading-none"
    @click="isOpen = !isOpen"
  >
    <span>{{ filterTitle }}</span>
    <Icon
      name="ion:chevron-down-outline"
      class="transform"
      :class="isOpen ? 'rotate-180' : ''"
    />
  </div>
  <div
    v-show="isOpen"
    class="custom-scrollbar mr-1 mt-3 grid max-h-[240px] gap-1 overflow-auto"
  >
    <div
      v-for="{ count, slug, name } in allPaTerms"
      :key="slug"
      class="flex items-center gap-2"
    >
      <input
        :id="slug"
        v-model="selectedTerms"
        type="checkbox"
        :value="slug"
        @change="checkboxChanged"
      />
      <label
        :for="slug"
        class="m-0 flex cursor-pointer flex-wrap items-center text-sm"
      >
        <span v-html="name" />
        <small
          v-if="showCount"
          class="ml-1 tabular-nums text-slate-400"
          aria-hidden="true"
          >({{ count || 0 }})</small
        >
      </label>
    </div>
  </div>
</template>

<script setup>
const { getFilter, setFilter, isFiltersActive } = useFiltering()

const props = defineProps({
  filterSlug: { type: String, default: "", required: true },
  label: { type: String, default: "" },
  hideEmpty: { type: Boolean, default: false },
  showCount: { type: Boolean, default: false },
  open: { type: Boolean, default: true },
})

const TaxonomyEnum = props?.filterSlug.toUpperCase().replace("_", "")

const { data } = await useAsyncGql("getAllTerms", {
  taxonomies: TaxonomyEnum,
  hideEmpty: props.hideEmpty,
})

const allPaTerms = data.value.terms?.nodes || []
const selectedTerms = ref(getFilter(props.filterSlug) || [])

const isOpen = ref(props.open)

watch(isFiltersActive, () => {
  // uncheck all checkboxes when filters are cleared
  if (!isFiltersActive.value) selectedTerms.value = []
})

// Update the URL when the checkbox is changed
const checkboxChanged = () => {
  setFilter(props.filterSlug, selectedTerms.value)
}
</script>

<template>
  <div
    class="mt-8 flex cursor-pointer items-center justify-between font-semibold leading-none"
    @click="isOpen = !isOpen"
  >
    <span>{{ label || filterSlug }}</span>
    <Icon
      name="ion:chevron-down-outline"
      class="transform"
      :class="isOpen ? 'rotate-180' : ''"
    />
  </div>
  <div
    v-show="isOpen"
    class="swatches custom-scrollbar mr-6 mt-3 grid max-h-[240px] gap-1.5 overflow-auto"
  >
    <div
      v-for="color in allPaTerms"
      :key="color.slug"
      :style="{ '--color': color.slug }"
      :title="color.name"
    >
      <input
        :id="color.slug"
        v-model="selectedTerms"
        class="hidden"
        type="checkbox"
        :value="color.slug"
        @change="checkboxChanged"
      />
      <label :for="color.slug" class="m-0 cursor-pointer"></label>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.swatches {
  grid-template-columns: repeat(auto-fit, minmax(24px, 1fr));
}

.swatches label {
  @apply relative m-0 mb-1 block w-full cursor-pointer rounded-md shadow-sm;
  background-color: var(--color, #eee);
  filter: saturate(0.75);
  aspect-ratio: 1/1;
  transition: all 0.2s ease;
}

.swatches label:hover,
.swatches input:checked + label {
  filter: saturate(1);
}

/* tick */
.swatches input:checked + label::after {
  content: "";
  width: 25%;
  height: 40%;
  border-right: 2.5px solid #fff;
  border-bottom: 2.5px solid #fff;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}

/* Make tick black if the color is white */
.swatches input:checked + label[for="white"]::after,
.swatches input:checked + label[for="yellow"]::after {
  border-color: #666;
}
</style>

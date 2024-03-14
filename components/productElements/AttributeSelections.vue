<script setup lang="ts">
const { formatURI } = useHelpers()

const { attrs } = defineProps<{ attrs: any[] }>()

const emit = defineEmits(["attrs-changed"])

const activeVariations = ref<Attribute[]>([])

const updateAttrs = () => {
  const selectedVariations = attrs.map((row): Attribute => {
    const radioValue = document.querySelector(
      `.name-${row.name}:checked`,
    ) as HTMLInputElement
    const dropdownValue = document.querySelector(
      `#${row.name}`,
    ) as HTMLSelectElement
    const name = row.name.charAt(0).toLowerCase() + row.name.slice(1)

    return {
      name,
      value: radioValue?.value ?? dropdownValue?.value ?? "",
    }
  })

  activeVariations.value = selectedVariations
  emit("attrs-changed", selectedVariations)
}

onMounted(() => {
  updateAttrs()
})
</script>

<template>
  <div v-if="attrs" class="flex flex-col justify-between gap-1">
    <div
      v-for="(attr, i) in attrs"
      :key="i"
      class="relative flex flex-wrap justify-between py-2"
    >
      <!-- COLOR SWATCHES -->
      <div
        v-if="attr.name == 'pa_color' || attr.name == 'color'"
        class="grid gap-2"
      >
        <div class="text-sm">
          {{ $t("messages.general.color") }}
          <span
            v-if="activeVariations.length"
            class="capitalize text-slate-400"
            >{{ formatURI(activeVariations[i].value) }}</span
          >
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(option, optionIndex) in attr.options"
            :key="optionIndex"
          >
            <label>
              <input
                :ref="attr.name"
                class="hidden"
                :checked="optionIndex == 0"
                type="radio"
                :class="`name-${attr.name}`"
                :name="attr.name"
                :value="option"
                @change="updateAttrs"
              />
              <span
                class="color-button"
                :class="`color-${option}`"
                :title="`${attr.name}: ${option}`"
              ></span>
            </label>
          </span>
        </div>
      </div>

      <!-- DROPDOWN -->
      <div
        v-else-if="attr.options && attr.options?.length > 8"
        class="grid gap-2"
      >
        <div class="text-sm">
          {{ attr.label }}
          <span
            v-if="activeVariations.length"
            class="capitalize text-slate-400"
            >{{ formatURI(activeVariations[i].value) }}</span
          >
        </div>
        <select
          :id="attr.name"
          :ref="attr.name"
          :name="attr.name"
          required
          class="border-white shadow"
          @change="updateAttrs"
        >
          <option disabled hidden>
            {{ $t("messages.general.choose") }} {{ formatURI(attr.label) }}
          </option>
          <option
            v-for="(option, dropdownIndex) in attr.options"
            :key="option"
            :value="option"
            :selected="dropdownIndex == 0"
            v-html="option"
          />
        </select>
      </div>

      <!-- CHECKBOXES -->
      <div v-else class="grid gap-2">
        <div class="text-sm">
          {{ attr.label }}
          <span v-if="activeVariations.length" class="capitalize text-slate-400"
            >: {{ formatURI(activeVariations[i].value) }}</span
          >
        </div>
        <div class="flex flex-wrap gap-2">
          <span v-for="(option, index) in attr.options" :key="index">
            <label>
              <input
                :ref="attr.name"
                class="hidden"
                :checked="index == 0"
                type="radio"
                :class="`name-${attr.name}`"
                :name="attr.name"
                :value="option"
                @change="updateAttrs"
              />
              <span
                class="radio-button"
                :class="`picker-${option}`"
                :title="`${attr.name}: ${option}`"
                >{{ formatURI(option) }}</span
              >
            </label>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.radio-button {
  @apply inline-block cursor-pointer rounded-lg border-2 border-transparent border-white bg-slate-50 px-3 py-1.5 text-center text-sm text-slate-800 outline outline-2 outline-slate-100 transition-all hover:outline-slate-500;
}

.color-button {
  @apply inline-block cursor-pointer rounded-2xl border-2 border-transparent border-white bg-slate-50 text-center text-sm text-slate-800 outline outline-2 outline-slate-100 transition-all hover:outline-slate-500;
  width: 2rem;
  height: 2rem;
}

.color-green {
  @apply bg-green-500;
}

.color-blue {
  @apply bg-blue-500;
}

.color-red {
  @apply bg-red-500;
}

.color-yellow {
  @apply bg-yellow-500;
}

.color-orange {
  @apply bg-orange-500;
}

.color-blue {
  @apply bg-blue-500;
}

.color-black {
  @apply bg-black;
}

input[type="radio"]:checked ~ span {
  @apply outline outline-2 outline-slate-500;
}
</style>

<script setup>
const { resetFilter } = useFiltering()
</script>

<template>
  <button
    class="mt-8 w-full rounded-lg bg-primary p-2 text-center text-sm font-bold text-white"
    @click="resetFilter"
  >
    {{ $t("messages.general.clearFilters") }}
  </button>
</template>

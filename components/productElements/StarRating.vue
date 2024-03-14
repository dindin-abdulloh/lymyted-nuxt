<script setup lang="ts">
defineProps({
  rating: { type: Number, default: 0 },
  count: { type: Number, default: null },
  hideCount: { type: Boolean, default: false },
  size: { type: Number, default: 14 },
})
</script>

<template>
  <div class="inline-flex items-center gap-1 text-base text-slate-500">
    <Icon name="ion:star" :size="size + ''" :color="'#FBBE24'" class="" />
    {{ Math.round(rating) }}
    <span v-if="count !== null && !hideCount" class="ml-1"
      >({{ count }} Reviews)</span
    >
  </div>
</template>

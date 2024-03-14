<script setup lang="ts">
const props = defineProps<{ status: string }>()
const readableStatus = computed(() => props.status.replace(/_/g, " "))
</script>

<template>
  <span :class="`order-${status}`" class="order-status">{{
    readableStatus
  }}</span>
</template>

<style lang="postcss" scoped>
.order-status {
  @apply inline-block rounded-md border bg-slate-100 p-1.5 text-xs font-semibold leading-none;
}

.order-COMPLETED {
  @apply border-green-100 bg-green-50 text-green-600;
}

.order-CANCELLED {
  @apply border-red-100 bg-red-50 text-red-600;
}

.order-PENDING {
  @apply border-yellow-100 bg-yellow-50 text-yellow-600;
}

.order-PROCESSING {
  @apply border-blue-100 bg-blue-50 text-blue-600;
}
</style>

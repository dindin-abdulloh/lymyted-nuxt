<script setup lang="ts">
interface ProductPriceProps {
  regularPrice?: string | null
  salePrice?: string | null
}

const { regularPrice, salePrice } = defineProps<ProductPriceProps>()
</script>

<template>
  <div v-if="regularPrice" class="flex font-semibold">
    <span
      :class="{ 'font-normal text-slate-400 line-through': salePrice }"
      v-html="regularPrice"
    />
    <span v-if="salePrice" class="ml-2">{{ salePrice }}</span>
  </div>
</template>

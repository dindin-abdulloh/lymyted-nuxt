<script setup lang="ts">
interface ProductPriceProps {
  regularPrice?: string | null
  salePrice?: string | null
}

const { regularPrice, salePrice } = defineProps<ProductPriceProps>()

const salePercentage = computed((): number => {
  const salePriceValue = parseFloat(salePrice?.replace(/\D/g, "") ?? "")
  const regularPriceValue = parseFloat(regularPrice?.replace(/\D/g, "") ?? "")
  return Math.round(
    ((salePriceValue - regularPriceValue) / regularPriceValue) * 100,
  )
})
</script>

<template>
  <h1 class="text-lg font-bold text-primary lg:text-4xl">{{ salePrice }}</h1>
  <h1 v-if="!salePrice" class="text-lg font-bold text-primary lg:text-4xl">
    {{ regularPrice }}
  </h1>
  <div
    v-if="regularPrice && salePrice"
    class="flex items-center font-semibold md:mt-2"
  >
    <span
      v-if="salePrice && salePercentage"
      class="mr-2 rounded-full bg-[#F32D12] px-2 py-1 text-white md:px-3"
    >
      {{ salePercentage }}%
    </span>
    <span :class="{ 'font-normal text-slate-400 line-through': salePrice }">{{
      regularPrice
    }}</span>
  </div>
</template>

<script setup lang="ts">
const { emptyCart } = useCart()
</script>

<template>
  <button
    class="absolute right-6 top-6 cursor-pointer md:right-8"
    title="Empty Cart"
    @click="emptyCart"
  >
    <TrashIcon />
  </button>
</template>

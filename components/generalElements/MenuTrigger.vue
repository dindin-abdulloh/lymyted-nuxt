<script setup lang="ts">
const { toggleMobileMenu } = useHelpers()
</script>

<template>
  <div>
    <Icon
      name="iconamoon:category-thin"
      size="32"
      color="#000"
      class="rounded-xl bg-primary/10 p-0.5 text-black md:!h-9 md:!w-9 md:p-2"
      type="linear"
      @click="toggleMobileMenu"
    />
  </div>
</template>

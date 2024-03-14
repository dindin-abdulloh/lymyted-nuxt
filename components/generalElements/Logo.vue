<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const img = useImage()

const logoUrl = runtimeConfig?.public?.LOGO
  ? img(runtimeConfig?.public?.LOGO)
  : null
</script>

<template>
  <NuxtLink to="/">
    <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="h-10 object-contain" />
    <img v-else src="/header_logo.png" alt="Logo" class="h-10 object-contain" />
  </NuxtLink>
</template>

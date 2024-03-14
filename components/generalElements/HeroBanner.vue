<script setup lang="ts">
defineProps<{
  title: string | VNode
  subtitle?: string | VNode
  description?: string | VNode
  imageUrl: string
  showShopUrl?: boolean
}>()
</script>

<template>
  <div
    class="relative mx-auto mt-6 flex h-[400px] w-full flex-col items-center gap-2 overflow-hidden rounded-t-[32px] bg-primary text-white md:items-start lg:gap-8"
  >
    <div
      :style="{ backgroundImage: `url(${imageUrl})` }"
      class="absolute z-[1] h-full w-full bg-cover bg-clip-border bg-center bg-no-repeat bg-origin-border"
    ></div>
    <div
      class="container absolute inset-0 z-[2] flex flex-col items-center justify-start gap-5 p-8 md:items-start md:justify-center md:bg-none lg:ml-0 lg:w-7/12"
    >
      <h1
        class="text-center text-3xl font-bold md:text-left md:text-4xl lg:text-6xl"
        v-html="title"
      ></h1>
      <h2
        v-if="subtitle"
        class="font-nunito text-center text-[24px] leading-[32px] md:text-left"
        v-html="subtitle"
      ></h2>
      <div
        v-if="description"
        class="text-md max-w-sm text-balance font-light lg:max-w-md"
      >
        <p v-html="description"></p>
      </div>
      <NuxtLink
        v-if="showShopUrl"
        class="rounded-xl border-2 border-white bg-transparent px-6 py-2 font-bold text-white hover:bg-gray-800 hover:bg-primary/20"
        to="/products"
        >Shop now</NuxtLink
      >
    </div>
  </div>
</template>

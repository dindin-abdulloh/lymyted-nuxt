<script setup lang="ts">
const { toggleMobileMenu } = useHelpers()
defineProps<{
  menus?: MenuItem[]
}>()
</script>

<template>
  <div
    class="fixed bottom-0 left-0 top-0 z-50 flex w-11/12 max-w-lg flex-col overflow-x-hidden bg-white shadow-lg"
  >
    <CloseIcon
      class="rounded-xl bg-white p-1.5 shadow-xl"
      @click="toggleMobileMenu(false)"
    />
    <div class="mt-8 text-center">{{ $t("messages.general.menu") }}</div>
    <MainMenu :menus="menus" class="m-4 grid gap-6 p-4 text-slate-500" />
  </div>
</template>

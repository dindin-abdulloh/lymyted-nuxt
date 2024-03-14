<script setup lang="ts">
const { lyMytedSEO } = useHelpers()
</script>

<template>
  <div v-if="lyMytedSEO.length" class="flex gap-4 text-xl">
    <a
      v-for="item in lyMytedSEO"
      :key="item.provider"
      :href="item.url"
      target="_blank"
      rel="noreferrer"
      :aria-label="item.provider"
    >
      <Icon
        class="text-slate-700 hover:text-slate-900"
        :name="`ion:logo-${item.provider}`"
      />
    </a>
  </div>
</template>

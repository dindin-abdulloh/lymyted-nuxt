<script lang="ts" setup>
const route = useRoute()

const activeTab = computed(() => route.query.tab || "uk-delivery")

useHead({
  title: `Delivery`,
  meta: [{ name: "description", content: "Delivery" }],
  link: [{ rel: "canonical", href: "https://www.lymyted.com/delivery" }],
})
</script>

<template>
  <div class="container min-h-[600px]">
    <div class="mb-24 flex w-full flex-col items-start lg:flex-row lg:gap-8">
      <nav
        class="top-24 my-8 flex w-full min-w-[240px] flex-wrap gap-1 text-slate-600 lg:sticky lg:grid lg:w-auto"
      >
        <NuxtLink
          to="/delivery?tab=uk-delivery"
          class="flex items-center gap-4 rounded-lg p-3 px-4 hover:bg-white hover:text-primary"
          :class="{ active: activeTab == 'uk-delivery' }"
        >
          UK Delivery
        </NuxtLink>
        <NuxtLink
          to="/delivery?tab=intl-delivery"
          class="flex items-center gap-4 rounded-lg p-3 px-4 hover:bg-white hover:text-primary"
          :class="{ active: activeTab == 'intl-delivery' }"
        >
          International Delivery
        </NuxtLink>
        <NuxtLink
          to="/delivery?tab=personalized-items"
          class="flex items-center gap-4 rounded-lg p-3 px-4 hover:bg-white hover:text-primary"
          :class="{ active: activeTab == 'personalized-items' }"
        >
          Personalized Items
        </NuxtLink>
      </nav>
      <main class="w-full flex-1 rounded-lg lg:my-8">
        <UkDelivery v-if="activeTab === 'uk-delivery'" />
        <IntlDelivery v-else-if="activeTab === 'intl-delivery'" />
        <PersonalizedItems v-else-if="activeTab === 'personalized-items'" />
      </main>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
a.active {
  @apply text-primary;
}
</style>

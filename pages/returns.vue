<script lang="ts" setup>
const route = useRoute()

const activeTab = computed(() => route.query.tab || "changing-your-mind")
useHead({
  title: `Returns`,
  meta: [{ name: "description", content: "Returns" }],
  link: [{ rel: "canonical", href: "https://www.lymyted.com/returns" }],
})
</script>

<template>
  <div class="container min-h-[600px]">
    <div class="mb-24 flex w-full flex-col items-start lg:flex-row lg:gap-8">
      <nav
        class="top-24 my-8 flex w-full min-w-[240px] flex-wrap gap-1 text-slate-600 lg:sticky lg:grid lg:w-auto"
      >
        <NuxtLink
          to="/returns?tab=changing-your-mind"
          class="flex items-center gap-4 rounded-lg p-3 px-4 hover:bg-white hover:text-primary"
          :class="{ active: activeTab == 'changing-your-mind' }"
        >
          Changing Your Mind
        </NuxtLink>
        <NuxtLink
          to="/returns?tab=returning-faulty-items"
          class="flex items-center gap-4 rounded-lg p-3 px-4 hover:bg-white hover:text-primary"
          :class="{ active: activeTab == 'returning-faulty-items' }"
        >
          Returning A Faulty Items
        </NuxtLink>
        <NuxtLink
          to="/returns?tab=exeptions"
          class="flex items-center gap-4 rounded-lg p-3 px-4 hover:bg-white hover:text-primary"
          :class="{ active: activeTab == 'exeptions' }"
        >
          Exeptions
        </NuxtLink>
      </nav>
      <main class="w-full flex-1 rounded-lg lg:my-8">
        <ChangingYourMind v-if="activeTab === 'changing-your-mind'" />
        <ReturningFaulty v-else-if="activeTab === 'returning-faulty-items'" />
        <Exeptions v-else-if="activeTab === 'exeptions'" />
      </main>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
a.active {
  @apply text-primary;
}

a {
  @apply uppercase;
}
</style>

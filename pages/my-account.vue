<script lang="ts" setup>
const { logoutUser, viewer, customer, isPending } = useAuth()
const { cart } = useCart()
const route = useRoute()

const activeTab = computed(() => route.query.tab || "my-details")
const showLoader = computed(() => !viewer && !customer)

useHead({
  title: `My Account`,
  meta: [{ name: "description", content: "My Account" }],
  link: [{ rel: "canonical", href: "https://www.lymyted.com/my-account" }],
})
</script>

<template>
  <div class="container min-h-[600px]">
    <div v-if="showLoader || !cart" class="flex min-h-[500px] flex-col">
      <LoadingIcon class="m-auto" />
    </div>
    <template v-else>
      <LazyLoginAndRegister v-if="!viewer" />
      <div
        v-else
        class="mb-24 flex w-full flex-col items-start lg:flex-row lg:gap-8"
      >
        <nav
          class="top-24 my-8 flex w-full min-w-[240px] flex-wrap gap-1 text-slate-600 lg:sticky lg:grid lg:w-auto"
        >
          <NuxtLink
            to="/my-account?tab=my-details"
            class="flex items-center gap-4 rounded-lg p-3 px-4 hover:bg-white hover:text-primary"
            :class="{ active: activeTab == 'my-details' }"
          >
            <Icon name="ion:information-circle-outline" size="22" />
            {{ $t("messages.general.myDetails") }}
          </NuxtLink>
          <NuxtLink
            to="/my-account?tab=orders"
            class="flex items-center gap-4 rounded-lg p-3 px-4 hover:bg-white hover:text-primary"
            :class="{ active: activeTab == 'orders' }"
          >
            <Icon name="ion:bag-check-outline" size="22" />
            {{ $t("messages.shop.order", 2) }}
          </NuxtLink>
          <!-- <NuxtLink -->
          <!--   to="/my-account?tab=downloads" -->
          <!--   class="flex items-center gap-4 rounded-lg p-3 px-4 hover:bg-white hover:text-primary" -->
          <!--   :class="{ active: activeTab == 'downloads' }" -->
          <!-- > -->
          <!--   <Icon name="ion:cloud-download-outline" size="22" /> -->
          <!--   {{ $t("messages.general.downloads") }} -->
          <!-- </NuxtLink> -->
          <button
            class="flex items-center gap-4 rounded-lg p-3 px-4 hover:bg-white hover:text-primary"
            @click="logoutUser"
          >
            <LoadingIcon v-if="isPending" size="22" />
            <Icon v-else name="ion:log-out-outline" size="22" />
            {{ $t("messages.account.logout") }}
          </button>
        </nav>

        <main class="w-full flex-1 rounded-lg lg:my-8">
          <AccountMyDetails v-if="activeTab === 'my-details'" :user="viewer" />
          <OrderList v-else-if="activeTab === 'orders'" />
        </main>
      </div>
    </template>
  </div>
</template>

<style lang="postcss" scoped>
a.active {
  @apply text-primary;
}
</style>

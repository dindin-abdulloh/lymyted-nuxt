<script setup lang="ts">
const { isShowingSearch } = useSearching()
defineProps<{
  menus?: MenuItem[]
}>()
</script>

<template>
  <header class="z-40 border-b bg-white">
    <div>
      <div class="container flex items-center justify-between gap-2 py-4">
        <div class="flex items-center">
          <Logo class="w-[100px] md:w-[160px]" />
        </div>
        <div
          class="hidden flex-1 items-center justify-center gap-4 md:w-[620px] lg:flex"
        >
          <ProductSearch class="hidden w-[70%] max-w-[620px] sm:inline-flex" />
          <SearchTrigger />
        </div>
        <div class="flex items-center gap-5">
          <NuxtLink to="/wishlist" title="Wishlist" class="hidden sm:block">
            <Icon name="ion:heart-outline" size="24" class="text-primary" />
          </NuxtLink>
          <CartTrigger />
          <SignInLink />
        </div>
      </div>
      <div
        class="container mb-2 flex flex-row items-center justify-between gap-4 lg:hidden"
      >
        <MenuTrigger class="lg:hidden" />
        <div class="flex flex-1 items-center justify-center gap-4 md:w-[160px]">
          <ProductSearch class="inline-flex w-[60%] max-w-[320px]" />
        </div>
      </div>
    </div>

    <Transition name="scale-y" mode="out-in">
      <div v-if="isShowingSearch" class="container -mt-1 mb-3 sm:hidden">
        <ProductSearch class="flex w-full" />
      </div>
    </Transition>
  </header>
  <HeaderMenu :menus="menus" />
  <section
    class="mt-4 flex w-full flex-row items-center justify-center gap-2 rounded-full bg-[#F0F9FF] p-2.5 md:gap-12"
  >
    <div class="flex items-center gap-2 p-2.5">
      <Icon
        name="fa6-solid:truck-fast"
        size="24"
        color="#fff"
        class="rounded-full bg-primary p-1 text-white md:!h-9 md:!w-9 md:p-2"
        type="linear"
      />
      <p class="text-xs md:text-base">Free UK Delivery</p>
    </div>
    <div class="flex items-center gap-2">
      <Icon
        name="ic:sharp-airplanemode-active"
        size="24"
        color="#fff"
        class="rounded-full bg-primary p-1 text-white md:!h-9 md:!w-9 md:p-2"
        type="linear"
      />
      <p class="text-xs md:text-base">We Ship WorldWide</p>
    </div>
    <div class="flex items-center gap-2">
      <Icon
        name="flowbite:rotate-solid"
        size="24"
        color="#fff"
        class="rounded-full bg-primary p-1 text-white md:!h-9 md:!w-9 md:p-2"
        type="linear"
      />
      <p class="text-xs md:text-base">Worldwide Return</p>
    </div>
  </section>
</template>

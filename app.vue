<script setup lang="ts">
const { data } = await useAsyncGql("getPrimaryMenuByCategory")
const menus = data?.value?.productCategories?.nodes
const route = useRoute()
const { isShowingCart, toggleCart } = useCart()
const { isShowingMobileMenu, toggleMobileMenu } = useHelpers()
const { addBodyClass, removeBodyClass } = useHelpers()

const closeCartAndMenu = () => {
  toggleCart(false)
  toggleMobileMenu(false)
}

watch([isShowingCart, isShowingMobileMenu], () => {
  isShowingCart.value || isShowingMobileMenu.value
    ? addBodyClass("overflow-hidden")
    : removeBodyClass("overflow-hidden")
})

watch(
  () => route.path,
  () => {
    closeCartAndMenu()
  },
)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader :menus="menus" />

    <Transition name="slide-from-right">
      <LazyCart v-if="isShowingCart" />
    </Transition>

    <Transition name="slide-from-left">
      <MobileMenu v-if="isShowingMobileMenu" :menus="menus" />
    </Transition>

    <NuxtPage />

    <Transition name="fade">
      <div
        v-if="isShowingCart || isShowingMobileMenu"
        class="fixed inset-0 z-40 bg-black opacity-25"
        @click="closeCartAndMenu"
      />
    </Transition>

    <LazyAppFooter :menus="menus" />
  </div>
</template>

<style lang="postcss">
:root,
.font-nunito {
  font-family: "Nunito", sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6,
.font-titillium-web {
  font-family: "Titillium Web", sans-serif;
}

html,
body {
  @apply bg-white text-[#121212];
  scroll-behavior: smooth;
}

img {
  image-rendering: crisp-edges;
  image-rendering: -webkit-optimize-contrast;
}

pre {
  @apply my-8 overflow-auto whitespace-pre-wrap rounded bg-slate-800 p-4 text-xs text-white;
}

select {
  @apply relative inline-flex flex-1 appearance-none items-center rounded-md border border-slate-300 bg-white p-1.5 px-4 py-2 pl-4 pr-12 text-sm font-medium text-slate-500 hover:bg-slate-50 focus:z-20;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 16 16'%3E%3Cpath stroke='%23333' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M4 6l4 4 4-4'/%3E%3C/svg%3E")
    center right 10px no-repeat;
  background-size: 1rem;
  padding-right: 2.5rem;
}

/* Slide-from-right & Slide-from-left */
.slide-from-right-leave-active,
.slide-from-right-enter-active,
.slide-from-left-leave-active,
.slide-from-left-enter-active {
  transition: transform 300ms ease-in-out;
}

.slide-from-right-enter-from,
.slide-from-right-leave-to {
  transform: translateX(500px);
}

.slide-from-left-enter-from,
.slide-from-left-leave-to {
  transform: translateX(-500px);
}

/* Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scale Y */
.scale-y-enter-active,
.scale-y-leave-active {
  transition: all 500ms linear;
  will-change: max-height, opacity;
  max-height: 9999px;
  overflow: hidden;
  opacity: 1;
}

.scale-y-enter-from,
.scale-y-leave-to {
  max-height: 0;
  opacity: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.custom-scrollbar::-webkit-scrollbar-track,
.custom-scrollbar::-webkit-scrollbar {
  @apply w-1.5 rounded bg-slate-100;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply rounded bg-slate-400;
}

@keyframes fadeIn {
  0% {
    opacity: 0.001;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fadeDisabledIn {
  0% {
    opacity: 0.001;
  }

  100% {
    opacity: 0.7;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.001;
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 20ms;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}

.page-enter-active {
  animation-duration: 200ms;
  animation-name: fadeIn;
  animation-timing-function: linear;
  backface-visibility: hidden;
}

.page-leave-active {
  animation-name: fadeOut;
  animation-duration: 200ms;
}

@keyframes skelaton {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

img.skeleton {
  animation: skelaton 2000ms infinite cubic-bezier(0.4, 0, 0.2, 1);
  background-image: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
}
</style>

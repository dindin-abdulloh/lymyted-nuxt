<script setup>
const { toggleCart, cart } = useCart()
</script>

<template>
  <div class="relative cursor-pointer" title="Cart" @click="toggleCart">
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="mr-1 md:mr-0"
    >
      <path
        d="M26.19 25.75H15.54C14.55 25.75 13.6 25.33 12.93 24.6C12.26 23.87 11.92 22.89 12 21.9L12.83 11.94C12.86 11.63 12.75 11.33 12.54 11.1C12.33 10.87 12.04 10.75 11.73 10.75H10C9.59 10.75 9.25 10.41 9.25 10C9.25 9.59 9.59 9.25 10 9.25H11.74C12.47 9.25 13.16 9.56 13.65 10.09C13.92 10.39 14.12 10.74 14.23 11.13H26.72C27.73 11.13 28.66 11.53 29.34 12.25C30.01 12.98 30.35 13.93 30.27 14.94L29.73 22.44C29.62 24.27 28.02 25.75 26.19 25.75ZM14.28 12.62L13.5 22.02C13.45 22.6 13.64 23.15 14.03 23.58C14.42 24.01 14.96 24.24 15.54 24.24H26.19C27.23 24.24 28.17 23.36 28.25 22.32L28.79 14.82C28.83 14.23 28.64 13.67 28.25 13.26C27.86 12.84 27.32 12.61 26.73 12.61H14.28V12.62Z"
        fill="#12ABF3"
      />
      <path
        d="M24.25 30.75C23.15 30.75 22.25 29.85 22.25 28.75C22.25 27.65 23.15 26.75 24.25 26.75C25.35 26.75 26.25 27.65 26.25 28.75C26.25 29.85 25.35 30.75 24.25 30.75ZM24.25 28.25C23.97 28.25 23.75 28.47 23.75 28.75C23.75 29.03 23.97 29.25 24.25 29.25C24.53 29.25 24.75 29.03 24.75 28.75C24.75 28.47 24.53 28.25 24.25 28.25Z"
        fill="#12ABF3"
      />
      <path
        d="M16.25 30.75C15.15 30.75 14.25 29.85 14.25 28.75C14.25 27.65 15.15 26.75 16.25 26.75C17.35 26.75 18.25 27.65 18.25 28.75C18.25 29.85 17.35 30.75 16.25 30.75ZM16.25 28.25C15.97 28.25 15.75 28.47 15.75 28.75C15.75 29.03 15.97 29.25 16.25 29.25C16.53 29.25 16.75 29.03 16.75 28.75C16.75 28.47 16.53 28.25 16.25 28.25Z"
        fill="#12ABF3"
      />
      <path
        d="M29 16.75H17C16.59 16.75 16.25 16.41 16.25 16C16.25 15.59 16.59 15.25 17 15.25H29C29.41 15.25 29.75 15.59 29.75 16C29.75 16.41 29.41 16.75 29 16.75Z"
        fill="#12ABF3"
      />
    </svg>
    <ClientOnly>
      <Transition name="popIn" mode="out-in">
        <span
          v-if="cart?.contents?.itemCount > 0"
          class="absolute -right-1 -top-0.5 inline-flex min-w-[16px] items-center justify-center rounded-full bg-primary p-[3px] text-[10px] leading-none text-white md:-right-2"
          >{{ cart?.contents?.itemCount }}</span
        >
      </Transition>
    </ClientOnly>
  </div>
</template>

<style lang="postcss">
/* popIn */
.popIn-enter-active,
.popIn-leave-active {
  transition: all 200ms cubic-bezier(0, 0, 0.57, 1.61);
}

.popIn-enter-from,
.popIn-leave-to {
  transform: scale(0);
}
</style>

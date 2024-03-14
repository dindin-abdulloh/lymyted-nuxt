<script setup lang="ts">
const { cart, toggleCart, isUpdatingCart } = useCart()
</script>

<template>
  <div
    class="fixed bottom-0 right-0 top-0 z-50 flex w-11/12 max-w-lg flex-col overflow-x-hidden bg-white shadow-lg"
  >
    <Icon
      name="ion:close-outline"
      class="absolute left-6 top-6 rounded-lg bg-white p-1 shadow-lg md:left-8"
      size="34"
      @click="toggleCart(false)"
    />
    <EmptyCart
      v-if="cart && !cart.isEmpty"
      class="rounded-lg p-1.5 shadow-lg hover:bg-red-400 hover:text-white"
    />

    <div class="mt-8 text-center">
      {{ $t("messages.shop.cart") }}
      <span v-if="cart?.contents?.productCount">
        ({{ cart?.contents?.productCount }})
      </span>
    </div>

    <ClientOnly>
      <template v-if="cart && !cart.isEmpty">
        <ul class="flex flex-1 flex-col gap-4 overflow-y-scroll p-6 md:p-8">
          <CartCard
            v-for="item in cart.contents?.nodes"
            :key="item.key"
            :item
          />
        </ul>
        <div class="mb-8 px-8">
          <NuxtLink
            class="block justify-evenly rounded-lg bg-primary p-3 text-center text-lg text-white shadow-md hover:bg-primary/90"
            to="/checkout"
          >
            <span class="mx-2">{{ $t("messages.shop.checkout") }}</span>
            <span v-html="cart.total" />
          </NuxtLink>
        </div>
      </template>
      <!-- Empty Cart Message -->
      <div
        v-else
        class="mb-12 flex flex-1 flex-col items-center justify-center"
      >
        <div class="mb-20 text-xl text-slate-300">
          {{ $t("messages.shop.cartEmpty") }}
        </div>
      </div>
    </ClientOnly>
    <!-- Cart Loading Overlay -->
    <div
      v-if="isUpdatingCart"
      class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-25"
    >
      <LoadingIcon />
    </div>
  </div>
</template>

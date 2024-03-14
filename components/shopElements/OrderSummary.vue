<script setup>
const { cart, isUpdatingCart } = useCart()
</script>

<template>
  <aside
    v-if="cart"
    class="relative mb-8 min-h-[280px] w-full rounded-lg bg-slate-100 p-8 shadow-lg md:sticky md:top-36 md:max-w-md"
  >
    <h2 class="mb-6 text-xl font-semibold leading-none">
      {{ $t("messages.shop.orderSummary") }}
    </h2>

    <ul class="-mr-2 flex flex-col gap-4 overflow-y-scroll">
      <CartCard
        v-for="item in cart.contents.nodes"
        :key="item.key"
        :item="item"
      />
    </ul>

    <AddCoupon class="my-8" />

    <div class="grid gap-1 text-sm font-semibold text-slate-500">
      <div class="flex justify-between">
        <span>{{ $t("messages.shop.subtotal") }}</span>
        <span class="tabular-nums text-slate-700" v-html="cart.subtotal" />
      </div>
      <div class="flex justify-between">
        <span>{{ $t("messages.general.shipping") }}</span>
        <span class="tabular-nums text-slate-700"
          >+ <span v-html="cart.shippingTotal"
        /></span>
      </div>
      <Transition name="scale-y" mode="out-in">
        <div v-if="cart && cart.appliedCoupons" class="flex justify-between">
          <span>{{ $t("messages.shop.discount") }}</span>
          <span class="tabular-nums text-primary"
            >- <span v-html="cart.discountTotal"
          /></span>
        </div>
      </Transition>
      <div class="mt-4 flex justify-between">
        <span>{{ $t("messages.shop.total") }}</span>
        <span
          class="text-lg font-bold tabular-nums text-slate-700"
          v-html="cart.total"
        />
      </div>
    </div>

    <slot></slot>

    <div
      v-if="isUpdatingCart"
      class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50"
    >
      <LoadingIcon />
    </div>
  </aside>
</template>

<script setup lang="ts">
const { cart, isUpdatingCoupon, applyCoupon, removeCoupon } = useCart()
const couponCode = ref<string>("")
const errorMessage = ref<string>("")

async function submitCoupon(): Promise<void> {
  const { message } = await applyCoupon(couponCode.value)
  if (message) {
    errorMessage.value = message
  } else {
    couponCode.value = ""
    errorMessage.value = ""
  }
}
</script>

<template>
  <div>
    <form class="flex gap-1" @submit.prevent="submitCoupon">
      <div class="relative flex-1 px-[6px] py-[3px]">
        <input
          id="couponCode"
          v-model="couponCode"
          type="text"
          :placeholder="$t('messages.shop.couponCode')"
          class="w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-2 shadow-sm outline-none"
          required
        />
        <div class="text-foreground absolute right-4 top-1">
          <button
            class="flex min-w-10 items-center justify-center rounded-xl border bg-primary px-2 py-1 text-white shadow-sm outline-none"
            :disabled="isUpdatingCoupon"
          >
            <LoadingIcon v-if="isUpdatingCoupon" color="#fff" size="16" />
            <Icon
              name="ion:arrow-forward-outline"
              size="32"
              class="cursor-pointer hover:bg-primary hover:text-white"
            />
          </button>
        </div>
      </div>
    </form>
    <Transition name="scale-y" mode="out-in">
      <div
        v-if="errorMessage"
        class="mt-2 text-xs text-red-600"
        v-html="errorMessage"
      ></div>
    </Transition>
    <Transition name="scale-y" mode="out-in">
      <div
        v-if="cart && cart.appliedCoupons"
        class="flex flex-wrap gap-2 text-xs font-semibold uppercase"
      >
        <div
          v-for="(coupon, index) in cart.appliedCoupons"
          :key="coupon?.code || index"
          class="flex-2 mt-2 flex flex-wrap"
        >
          <div
            v-if="coupon?.code"
            class="flex items-center gap-1 rounded-md border border-primary border-opacity-10 bg-primary bg-opacity-5 p-1.5 leading-none text-primary"
          >
            <span v-html="coupon.code" />
            <Icon
              name="ion:close"
              class="cursor-pointer rounded-full hover:bg-primary hover:text-white"
              @click="removeCoupon(coupon.code)"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

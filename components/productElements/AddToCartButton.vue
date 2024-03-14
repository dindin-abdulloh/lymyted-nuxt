<script setup>
const { cart } = useCart()
const props = defineProps({
  disabled: { type: Boolean, default: false },
})
const isLoading = ref(false)
const { t } = useI18n()
const addToCartButtonText = computed(() =>
  isLoading.value ? t("messages.shop.adding") : t("messages.shop.addToCart"),
)

// stop loading when cart is updated
watch(cart, (val) => {
  isLoading.value = false
})
</script>

<template>
  <button
    type="submit"
    class="flex min-w-[150px] items-center justify-center gap-4 rounded-lg bg-primary p-2.5 text-center font-bold text-white focus:outline-none"
    :class="{ disabled: disabled }"
    :disabled="disabled"
    @click="isLoading = true"
  >
    <span>{{ addToCartButtonText }}</span>
    <LoadingIcon v-if="isLoading" stroke="4" size="12" color="#fff" />
  </button>
</template>

<style lang="postcss" scoped>
button {
  outline: none !important;
  transition: all 150ms ease-in;
}

button.disabled {
  @apply cursor-not-allowed bg-slate-400;
}
</style>

<template>
  <div
    class="justify-centger isolate flex items-center rounded-lg border border-slate-300 bg-white p-1 text-sm leading-none shadow-sm shadow-slate-200"
  >
    <button
      title="Decrease Quantity"
      aria-label="Decrease Quantity"
      type="button"
      class="h-6 w-6 rounded-full border border-r border-slate-300 hover:bg-slate-50 focus:outline-none disabled:cursor-not-allowed"
      :disabled="isUpdatingCart || quantity <= 1"
      @click="decrementQuantity"
    >
      <Icon name="ion:remove" size="14" />
    </button>
    <input
      v-model.number="quantity"
      type="number"
      min="0"
      :max="productType.stockQuantity"
      aria-label="Quantity"
      class="mx-3 flex w-8 items-center justify-center p-2 text-center text-xs focus:outline-none"
    />
    <button
      title="Increase Quantity"
      aria-label="Increase Quantity"
      type="button"
      class="h-6 w-6 rounded-full border border-l border-slate-300 hover:bg-slate-50 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-100"
      :disabled="isUpdatingCart || hasNoMoreStock"
      @click="incrementQuantity"
    >
      <Icon name="ion:add" size="14" />
    </button>
  </div>
</template>

<script setup lang="ts">
const { updateItemQuantity, isUpdatingCart } = useCart()
const { debounce } = useHelpers()

const { item } = defineProps({ item: { type: Object, required: true } })

const productType = computed(() =>
  item.variation ? item.variation?.node : item.product?.node,
)
const quantity = ref(item.quantity)
const key = item.key
const hasNoMoreStock = computed(() =>
  productType.value.stockQuantity
    ? productType.value.stockQuantity <= quantity.value
    : false,
)

const incrementQuantity = () => quantity.value++
const decrementQuantity = () => quantity.value > 1 && quantity.value--

watch(
  quantity,
  debounce(() => {
    updateItemQuantity(key, quantity.value)
  }, 250),
)
</script>

<style scoped lang="postcss">
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>

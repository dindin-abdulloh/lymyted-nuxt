<script setup>
const props = defineProps({
  modelValue: { type: String, required: true, default: "stripe" },
  paymentGateways: { type: Array, required: true },
})

const paymentMethod = toRef(props, "modelValue")

const emits = defineEmits(["update:modelValue"])

const updatePaymentMethod = (value) => {
  emits("update:modelValue", value)
}

onMounted(() => {
  // Emit first payment method
  if (props.paymentGateways.length)
    updatePaymentMethod(props.paymentGateways[0].id)
})
</script>

<template>
  <div class="payment-options grid gap-4 leading-tight">
    <div
      v-for="gateway in paymentGateways"
      :key="gateway.id"
      class="option"
      :class="{ 'active-option': paymentMethod === gateway.id }"
      @click="updatePaymentMethod(gateway.id)"
    >
      <icon
        v-if="gateway.id === 'stripe'"
        name="ion:card-outline"
        size="20"
        class="text-slate-600"
      />
      <icon
        v-else-if="gateway.id === 'paypal'"
        name="ion:logo-paypal"
        size="20"
        class="text-slate-600"
      />
      <icon v-else name="ion:cash-outline" size="20" class="text-slate-600" />
      <span>{{ gateway.title }}</span>
      <icon
        name="ion:checkmark-circle"
        size="20"
        class="checkmark ml-auto text-primary"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.payment-options {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.payment-options .option {
  @apply flex w-full cursor-pointer items-center gap-2 rounded-lg border bg-slate-100 px-4 py-3 hover:border-blue-300;
}

.payment-options .active-option {
  @apply cursor-default border-primary border-opacity-50 shadow-sm;
  pointer-events: none;
}
.payment-options .option .checkmark {
  opacity: 0;
}
.payment-options .active-option .checkmark {
  opacity: 1;
}
</style>

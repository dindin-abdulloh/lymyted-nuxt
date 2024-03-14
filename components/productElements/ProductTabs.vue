<script setup lang="ts">
const { product } = defineProps({
  product: { type: Object as PropType<Product>, required: true },
})

const initialTab = product.description ? 0 : 1
const show = ref(initialTab)
</script>

<template>
  <div>
    <nav class="tabs flex gap-8 border-b">
      <button
        v-if="product.description"
        type="button"
        :class="show === 0 ? 'active' : ''"
        @click.prevent="show = 0"
      >
        {{ $t("messages.shop.productDescription") }}
      </button>
      <button
        type="button"
        :class="show === 1 ? 'active' : ''"
        @click.prevent="show = 1"
      >
        {{ $t("messages.shop.reviews") }} ({{ product.reviewCount }})
      </button>
    </nav>
    <div class="tab-contents">
      <div
        v-if="show === 0 && product.description"
        class="prose mt-8 font-light"
        v-html="product.description"
      />
      <ProductReviews v-if="show === 1" :product="product" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.tabs button {
  @apply border-b-2 border-transparent pb-8 text-lg;
  margin-bottom: -1px;
}

.tabs button.active {
  @apply border-primary text-primary;
}
</style>

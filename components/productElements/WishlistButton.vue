<script setup lang="ts">
const { addToWishlist, removeFromWishlist, isInList } = useWishlist()

const { product } = defineProps<{ product: Product }>()

const isWishlisted = computed(() =>
  product.databaseId ? isInList(product.databaseId) : false,
)

const toggleWishlist = () =>
  isWishlisted.value && product.databaseId
    ? removeFromWishlist(product.databaseId)
    : addToWishlist(product)
</script>

<template>
  <button
    type="button"
    class="flex cursor-pointer items-center gap-2 text-sm text-slate-400"
    @click="toggleWishlist"
  >
    <Icon v-if="isWishlisted" name="ion:heart" size="18" class="text-red-400" />
    <Icon v-else name="ion:heart-outline" size="18" />
    <span>{{
      isWishlisted
        ? $t("messages.shop.wishlistRemove")
        : $t("messages.shop.wishlistAdd")
    }}</span>
  </button>
</template>

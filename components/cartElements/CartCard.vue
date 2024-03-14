<script setup>
const { updateItemQuantity } = useCart()
const { addToWishlist } = useWishlist()
const { formatURI } = useHelpers()

const { item } = defineProps({
  item: { type: Object, required: true },
})

const productType = computed(() =>
  item.variation ? item.variation?.node : item.product?.node,
)

const productSlug = computed(
  () => `/product/${formatURI(item.product.node.slug)}`,
)

const isLowStock = computed(() =>
  productType.value.stockQuantity
    ? productType.value.lowStockAmount >= productType.value.stockQuantity
    : false,
)

const removeItem = () => {
  updateItemQuantity(item.key, 0)
}

const moveToWishList = () => {
  addToWishlist(item.product.node)
  removeItem()
}

const salePercentage = computed(() => {
  const regularPrice = parseFloat(
    productType.value.regularPrice.replace(/\D/g, ""),
  )
  const salePrice = parseFloat(productType.value.salePrice.replace(/\D/g, ""))
  return Math.round(((regularPrice - salePrice) / regularPrice) * 100) + "%"
})
</script>

<template>
  <SwipeCard @remove="removeItem">
    <div v-if="productType" class="group flex items-center gap-3">
      <NuxtLink :to="productSlug">
        <img
          v-if="productType.image"
          width="64"
          height="64"
          class="skeleton h-16 w-16 rounded-md"
          :src="
            productType.image.cartSourceUrl ||
            productType.image.sourceUrl ||
            item.product.image.sourceUrl
          "
          :alt="productType.image?.altText || productType.name"
          :title="productType.image?.title || productType.name"
          loading="lazy"
        />
        <NuxtImg
          v-else
          src="/images/placeholder.jpg"
          width="64"
          height="64"
          class="skeleton h-16 w-16 rounded-md"
          :alt="productType.image?.altText || productType.name"
          :title="productType.image?.title || productType.name"
          loading="lazy"
        />
      </NuxtLink>
      <div class="flex-1">
        <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
          <NuxtLink class="leading-tight" :to="productSlug">{{
            productType.name
          }}</NuxtLink>
          <span
            v-if="productType.salePrice"
            class="inline-block rounded border border-green-200 bg-green-100 p-0.5 text-[10px] leading-none text-green-600"
            >Save {{ salePercentage }}
          </span>
          <span
            v-if="isLowStock"
            class="inline-block rounded border border-yellow-200 bg-yellow-100 p-0.5 text-[10px] leading-none text-orange-500"
            >Low Stock</span
          >
        </div>
        <ProductPrice
          class="mt-1 text-xs"
          :sale-price="productType.salePrice"
          :regular-price="productType.regularPrice"
        />
      </div>
      <div class="inline-flex flex-col items-end gap-2">
        <QuantityInput :item class="hidden md:flex" />
        <div
          class="flex items-center text-xs leading-none text-slate-400 group-hover:text-slate-700"
        >
          <button
            class="mr-2 hidden border-r pr-2 md:inline-flex"
            type="button"
            @click="moveToWishList"
          >
            Move to Wishlist
          </button>
          <button
            title="Remove Item"
            aria-label="Remove Item"
            type="button"
            class="hidden cursor-pointer items-center gap-1 hover:text-red-500 md:flex"
            @click="removeItem"
          >
            <Icon name="ion:trash" class="hidden md:inline-block" size="12" />
          </button>
        </div>
      </div>
    </div>
  </SwipeCard>
</template>

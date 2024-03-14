<script setup>
const { formatURI } = useHelpers()
const route = useRoute()
const { node } = defineProps({
  node: { type: Object, default: null },
  index: { type: Number, default: 1 },
})

const imgWidth = 220
const imgHeight = Math.round(imgWidth * 1.125)

// example: ?filter=pa_color[green,blue],pa_size[large]
const filterQuery = ref(route.query.filter)
const paColor = ref(
  filterQuery.value?.split("pa_color[")[1]?.split("]")[0]?.split(",") || [],
)

// watch filterQuery
watch(
  () => route.query,
  () => {
    filterQuery.value = route.query.filter
    paColor.value =
      filterQuery.value?.split("pa_color[")[1]?.split("]")[0]?.split(",") || []
  },
)

const mainImage = computed(() => node?.image?.sourceUrl)

const colorVariableImage = computed(() => {
  if (paColor.value.length) {
    const activeColorImage = node?.variations?.nodes.filter((variation) => {
      const hasMatchingAttributes = variation.attributes.nodes.some(
        (attribute) =>
          paColor.value.some((color) => attribute.value.includes(color)),
      )
      const hasMatchingSlug = paColor.value.some((color) =>
        variation.slug.includes(color),
      )
      return hasMatchingAttributes || hasMatchingSlug
    })
    if (activeColorImage?.length) return activeColorImage[0]?.image?.sourceUrl
  }
  return null
})

const { addToWishlist, removeFromWishlist, isInList } = useWishlist()

const isWishlisted = computed(() =>
  node.databaseId ? isInList(node.databaseId) : false,
)

const toggleWishlist = () =>
  isWishlisted.value && node.databaseId
    ? removeFromWishlist(node.databaseId)
    : addToWishlist(node)
</script>

<template>
  <div class="product-card relative rounded-t-2xl">
    <div class="relative">
      <NuxtLink :to="`/product/${formatURI(node.slug)}`" :title="node.name">
        <SaleBadge :node="node" class="absolute bottom-2 right-2" />
        <img
          v-if="colorVariableImage"
          :src="colorVariableImage"
          :alt="node.image?.altText || node.name"
          :title="node.image?.title || node.name"
          :loading="index <= 3 ? 'eager' : 'lazy'"
          class="skeleton" />
        <NuxtImg
          v-else
          :width="imgWidth"
          :height="imgHeight"
          :src="mainImage || '/images/placeholder.jpg'"
          :alt="node.image?.altText || node.name"
          :title="node.image?.title || node.name"
          :loading="index <= 3 ? 'eager' : 'lazy'"
          fit="outside"
          format="webp"
          class="skeleton"
          densities="x1 x2"
      /></NuxtLink>
      <button
        type="button"
        class="absolute bottom-2 left-2 mt-4 flex cursor-pointer items-center gap-2 text-sm text-slate-400"
        @click="toggleWishlist"
      >
        <Icon
          v-if="isWishlisted"
          name="ion:heart"
          size="18"
          class="text-red-400"
        />
        <Icon v-else name="ion:heart-outline" size="18" />
      </button>
    </div>
    <div class="p-2">
      <StarRating
        v-if="node.reviewCount > 0"
        :rating="node.averageRating"
        :count="node.reviewCount"
      />
      <NuxtLink :to="`/product/${formatURI(node.slug)}`" :title="node.name">
        <h2 class="mb-2 font-light leading-tight">{{ node.name }}</h2>
      </NuxtLink>
      <ProductPrice
        class="text-sm"
        :sale-price="node.salePrice"
        :regular-price="node.regularPrice"
      />
    </div>
  </div>
</template>

<style lang="postcss">
.product-card img {
  @apply w-full rounded-t-3xl object-cover object-top;
  aspect-ratio: 250/210;
}

.product-card:hover {
  h2 {
    @apply text-primary;
  }
}
</style>

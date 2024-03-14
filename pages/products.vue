<script setup>
const { setProducts, updateProductList } = useProducts()
const route = useRoute()

const { isQueryEmpty } = useHelpers()

const { data } = await useAsyncGql("getProducts", { first: 100 })
const allProducts = data.value?.products?.nodes ?? []
setProducts(allProducts)

onMounted(() => {
  if (!isQueryEmpty.value) updateProductList()
})

watch(
  () => route.query,
  () => {
    if (route.name !== "products") return
    updateProductList()
  },
)

useHead({
  title: `Products`,
  meta: [{ hid: "description", name: "description", content: "Products" }],
})
</script>

<template>
  <div v-if="allProducts.length" class="container flex items-start gap-16">
    <Filters />

    <div class="w-full">
      <div class="mt-8 flex w-full items-center justify-between gap-4 md:gap-8">
        <ProductResultCount />
        <OrderByDropdown class="hidden md:inline-flex" />
        <LazyShowFilterTrigger class="md:hidden" />
      </div>
      <ProductGrid />
    </div>
  </div>
  <NoProductsFound v-else
    >Could not fecth products from your store. Please check your
    configuration.</NoProductsFound
  >
</template>

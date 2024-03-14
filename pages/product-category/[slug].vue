<script setup>
const { setProducts, updateProductList } = useProducts()
const { isQueryEmpty } = useHelpers()
const route = useRoute()
const slug = route.params.slug
const { data: productCategoriesData } = await useAsyncGql(
  "getProductCategoryBySlug",
  { id: slug },
)
const productCategory = productCategoriesData.value?.productCategory
const { data } = await useAsyncGql("getProducts", { slug })
setProducts(data.value?.products?.nodes || [])

onMounted(() => {
  if (!isQueryEmpty.value) updateProductList()
})

watch(
  () => route.query,
  () => {
    if (route.name !== "product-category-slug") return
    updateProductList()
  },
)

useHead({
  title: "Products",
  meta: [{ hid: "description", name: "description", content: "Products" }],
})
</script>

<template>
  <div>
    <section class="container mt-4 px-0 md:px-6">
      <div
        class="overflow-hidden rounded-t-[44px] bg-primary/15 px-5 py-10 lg:px-[60px] lg:py-10"
      >
        <div
          class="mb-12 flex items-center gap-2 text-sm leading-none text-slate-400"
        >
          <span>
            <NuxtLink to="/" class="text-primary">{{
              $t("messages.general.home")
            }}</NuxtLink>
            <span> /</span>
          </span>
          <span class="text-slate-400">{{ productCategory.name }}</span>
        </div>
        <h1
          class="mb-8 text-left text-[36px] font-bold leading-[1] md:text-[56px]"
        >
          {{ productCategory.name }}
        </h1>
        <p class="text-base">
          {{ productCategory.description }}
        </p>
      </div>
    </section>
    <div class="container flex items-start gap-16 px-4 md:px-6">
      <Filters :hide-categories="true" />

      <div class="w-full">
        <div
          class="mt-8 flex w-full items-center justify-between gap-4 md:gap-8"
        >
          <ProductResultCount />
          <OrderByDropdown class="hidden md:inline-flex" />
          <ShowFilterTrigger class="md:hidden" />
        </div>
        <ProductGrid />
      </div>
    </div>
  </div>
</template>

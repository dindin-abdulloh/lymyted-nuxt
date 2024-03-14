<script lang="ts" setup>
import { prices } from "~/lib/data"
const route = useRoute()
const { isQueryEmpty } = useHelpers()
const { setFilter, isFiltersActive } = useFiltering()

const { data } = await useAsyncGql("getProductCategories", { first: 6 })
const productCategories = data.value?.productCategories?.nodes || []
const { data: productsData } = await useAsyncGql("getProducts", {
  first: 4,
})
const { data: topSalesProductsData } = await useAsyncGql("getProducts", {
  where: { orderby: { field: "TOTAL_SALES" } },
  first: 4,
})
const { data: allProductsData } = await useAsyncGql("getProductsByPrices", {
  first: 100,
})

const newestProducsts = productsData.value?.products?.nodes ?? []
const topSalesProducts = topSalesProductsData.value?.products?.nodes ?? []
const allProducts = allProductsData.value?.products?.nodes ?? []

const { setProducts, updateProductList } = useProducts()
// @ts-ignore
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

useSeoMeta({
  title: `Home`,
  ogTitle: `Lymyted`,
  description: `Shop all things Unicorn, we have Unicorn Mugs, Unicorn Onesie, Unicorn Hat &amp; much more. We have gifts for everyone. Free UK Delivery.`,
  ogDescription: `Shop all things Unicorn, we have Unicorn Mugs, Unicorn Onesie, Unicorn Hat &amp; much more. We have gifts for everyone. Free UK Delivery.`,
  twitterCard: `summary_large_image`,
})

const giftText = ref(
  '<span class="text-black">Everyone deserves a <span class="text-[#F84483]">GIFT</span></span>',
)
const giftSubtitle = ref(
  '<span class="text-black">Show some love! Find unique gifts at affordable prices.</span>',
)

const runtimeConfig = useRuntimeConfig()
const maxPrice = runtimeConfig?.public?.MAX_PRICE || 1000
const price = ref([0, maxPrice])

const resetSlider = () => {
  price.value = [0, maxPrice]
}

const applyPrice = (value: string[]) => {
  setFilter("price", value)
}

watch(isFiltersActive, () => {
  if (!isFiltersActive.value) resetSlider()
})
</script>

<template>
  <main class="md:container">
    <div class="hidden sm:block">
      <HeroBannerLeft
        title="Up to 50% off* <br> our feel-good sale"
        image-url="/images/hero-banner-blue.jpg"
        subtitle="Explore a curated collection of inspiring finds."
        :show-shop-url="true"
      />
    </div>
    <div class="sm:hidden">
      <HeroBannerLeft
        title="Up to 50% off* <br> our feel-good sale"
        image-url="/images/mobile-hero-1.jpg"
        subtitle="Explore a curated collection of inspiring finds."
        :show-shop-url="true"
      />
    </div>
    <section>
      <div
        class="bg-gradient-to-b from-primary/20 from-50% to-white px-5 py-10 lg:px-[16px] lg:py-10"
      >
        <h1
          class="text-center text-[36px] font-bold leading-[1] md:text-[56px]"
        >
          More than just a <span class="text-[#F84483]">present</span>
        </h1>
        <section class="my-16 md:container">
          <div
            class="mt-8 grid grid-cols-2 justify-center gap-2 md:grid-cols-3 md:gap-6 lg:gap-8"
          >
            <CategoryCard
              v-for="(category, i) in productCategories"
              :key="i"
              class="w-full"
              :node="category as ProductCategory"
            />
          </div>
        </section>
      </div>
    </section>
    <section>
      <div class="hidden sm:block">
        <HeroBannerLeft
          class="text-left"
          :title="giftText"
          image-url="/images/hero-banner-gift.jpg"
          :subtitle="giftSubtitle"
          :show-shop-url="true"
        />
      </div>
      <div class="sm:hidden">
        <HeroBannerLeft
          class="text-left"
          :title="giftText"
          image-url="/images/mobile-hero-2.jpg"
          :subtitle="giftSubtitle"
          :show-shop-url="true"
        />
      </div>
      <div class="p-4 md:px-10">
        <div class="flex flex-wrap gap-5 overflow-x-auto">
          <button
            :class="[
              'rounded-2xl border p-[10px]',
              route.fullPath === '/' ||
              route.fullPath.includes('?filter=price[0,10000]')
                ? 'border-white bg-primary text-white'
                : 'border-slate-200',
            ]"
            @click="() => applyPrice(['0', '10000'])"
          >
            ALL
          </button>
          <button
            v-for="item in prices"
            :key="item.id"
            :class="[
              'rounded-2xl border p-[10px]',
              route.fullPath.includes(item.path)
                ? 'border-white bg-primary text-white'
                : 'border-slate-200',
            ]"
            @click="() => applyPrice(item.value)"
          >
            {{ item.label }}
          </button>
        </div>
        <div>
          <ProductGrid />
        </div>
      </div>
    </section>
    <section
      class="mx-5 mt-10 overflow-hidden rounded-[44px] bg-[#FFFEF6] md:mx-8 lg:flex"
    >
      <div
        class="text-foreground relative flex w-full flex-col items-start justify-center gap-2 overflow-hidden md:items-start lg:w-1/2"
      >
        <div
          :style="{ backgroundImage: 'url(\'/images/bg-hero-yellow.jpg\')' }"
          class="absolute z-[1] h-full w-full bg-cover bg-clip-border bg-bottom bg-no-repeat bg-origin-border"
        ></div>
        <div
          class="absolute z-[2] h-full w-full bg-[#FFFAC9]/50 bg-cover bg-clip-border bg-center bg-no-repeat bg-origin-border"
        ></div>
        <div class="relative z-10 mx-5 my-10 flex flex-col md:mx-8">
          <h1
            class="text-left text-[36px] font-bold leading-[1] md:text-[64px] lg:text-[72px]"
          >
            Something new is coming
          </h1>
          <NuxtLink
            class="mt-8 w-[max-content] cursor-pointer rounded-2xl bg-primary px-6 py-3 text-white"
            href="/products?order-by=date"
          >
            Shop New Items
          </NuxtLink>
        </div>
      </div>
      <section class="py-10 lg:w-1/2 lg:px-[60px]">
        <div
          class="flex flex-nowrap gap-3 overflow-x-auto px-4 md:grid md:grid-cols-2 md:gap-6 md:px-10 md:py-6"
        >
          <div
            v-for="(node, i) in newestProducsts"
            :key="node.id || i"
            class="max-md:grow-1 max-md:w-[250px] max-md:shrink-0"
          >
            <ProductCard :node="node" :index="i" />
          </div>
        </div>
      </section>
    </section>
    <section
      class="mx-5 mt-10 overflow-hidden rounded-[44px] bg-[#F0F9FF] md:mx-8 lg:flex"
    >
      <div
        class="text-foreground relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden md:items-start lg:w-1/2"
      >
        <div
          :style="{ backgroundImage: 'url(\'/images/bg-hero-blue.jpg\')' }"
          class="absolute z-[1] h-full w-full bg-cover bg-clip-border bg-bottom bg-no-repeat bg-origin-border"
        ></div>
        <div
          class="absolute z-[2] h-full w-full bg-primary/10 bg-cover bg-clip-border bg-center bg-no-repeat bg-origin-border"
        ></div>
        <div class="relative z-10 mx-5 my-10 flex flex-col md:mx-8">
          <h1
            class="text-left text-[36px] font-bold leading-[1] md:text-[64px] lg:text-[72px]"
          >
            Our top selling product
          </h1>
          <NuxtLink
            class="mt-8 w-[max-content] rounded-2xl bg-primary px-6 py-3 text-white"
            href="/products?order-by=discount"
          >
            Shop Top Selling Product
          </NuxtLink>
        </div>
      </div>
      <section class="py-10 lg:w-1/2 lg:px-[60px]">
        <div
          class="flex flex-nowrap gap-3 overflow-x-auto px-4 md:grid md:grid-cols-2 md:gap-6 md:px-10 md:py-6"
        >
          <div
            v-for="(node, i) in topSalesProducts"
            :key="node.id || i"
            class="max-md:grow-1 max-md:w-[250px] max-md:shrink-0"
          >
            <ProductCard :node="node" :index="i" />
          </div>
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}
</style>

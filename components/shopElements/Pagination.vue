<script setup lang="ts">
const route = useRoute()
const { productsPerPage } = useHelpers()
const { formatURI } = useHelpers()
const { products } = useProducts()

// TODO: Refactor all this logic. It's a mess.
const currentQuery = computed(() => {
  const query = route.query
  const queryKeys = Object.keys(query)
  let currentQuery = ""
  if (queryKeys.length > 0) {
    queryKeys.forEach((key, index) => {
      currentQuery +=
        index === 0 ? `${key}=${query[key]}` : `&${key}=${query[key]}`
    })
  }
  return formatURI(currentQuery)
})

const page = ref(
  route.params.pageNumber ? parseInt(route.params.pageNumber as string) : 1,
)
const numberOfPages = computed<number>(() =>
  Math.ceil(products.value.length / productsPerPage || 1),
)

const prevSrc = (pageNumber: number) => {
  if (currentQuery.value === "") {
    return formatURI(
      `/products/page/${pageNumber > 1 ? pageNumber - 1 : pageNumber}`,
    )
  } else {
    return formatURI(
      pageNumber > 1
        ? `/products/page/${pageNumber - 1}/?${currentQuery.value}`
        : `/products/page/${pageNumber}/?${currentQuery.value}`,
    )
  }
}

const nextSrc = (pageNumber: number) => {
  if (currentQuery.value === "") {
    return formatURI(
      `/products/page/${pageNumber < numberOfPages.value ? pageNumber + 1 : pageNumber}`,
    )
  } else {
    return formatURI(
      pageNumber < numberOfPages.value
        ? `/products/page/${pageNumber + 1}/?${currentQuery.value}`
        : `/products/page/${pageNumber}/?${currentQuery.value}`,
    )
  }
}

const numberSrc = (pageNumber: number) => {
  if (currentQuery.value === "") {
    return formatURI(`/products/page/${pageNumber}`)
  } else {
    return formatURI(`/products/page/${pageNumber}/?${currentQuery.value}`)
  }
}
</script>

<template>
  <div class="col-span-full mb-16 mt-8 flex justify-center tabular-nums">
    <!-- Pagination -->
    <nav
      v-if="numberOfPages && numberOfPages > 1"
      class="isolate inline-flex -space-x-px self-end rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <!-- PREV -->
      <NuxtLink
        :to="prevSrc(page)"
        class="prev"
        :disabled="page == 1"
        :class="{ 'cursor-not-allowed': page == 1 }"
        :aria-disabled="page == 1"
        aria-label="Previous"
      >
        <Icon name="ion:chevron-back-outline" size="20" class="h-5 w-5" />
      </NuxtLink>

      <!-- NUMBERS -->
      <NuxtLink
        v-for="pageNumber in numberOfPages"
        :key="pageNumber"
        :to="numberSrc(pageNumber)"
        :aria-current="pageNumber === page ? 'page' : undefined"
        class="page-number"
        >{{ pageNumber }}</NuxtLink
      >

      <!-- NEXT -->
      <NuxtLink
        :to="nextSrc(page)"
        class="next"
        :disabled="page === numberOfPages"
        :class="{ 'cursor-not-allowed': page === numberOfPages }"
        :aria-disabled="page === numberOfPages"
        aria-label="Next"
      >
        <Icon name="ion:chevron-forward-outline" size="20" class="h-5 w-5" />
      </NuxtLink>
    </nav>
  </div>
</template>

<style lang="postcss" scoped>
.prev,
.next,
.page-number {
  @apply relative inline-flex items-center border border-slate-300 bg-white p-2 text-sm font-medium text-slate-500 hover:bg-slate-50 focus:z-10;
}

.prev {
  @apply rounded-l-md;
}

.next {
  @apply rounded-r-md;
}

.page-number {
  @apply px-3;
}

.page-number[aria-current="page"] {
  @apply z-10 border border-primary bg-primary bg-opacity-10 text-primary;
}
</style>

<script setup lang="ts">
const { theList } = useWishlist()

useHead({
  title: `Wishlist`,
  meta: [{ name: "description", content: "Wishlist" }],
  link: [{ rel: "canonical", href: "https://www.lymyted.com/wishlist" }],
})
</script>

<template>
  <div class="mx-auto my-4 min-h-[600px] w-full max-w-3xl px-4">
    <h1 class="my-4 border-b py-4 text-center text-2xl font-semibold">
      {{ $t("messages.shop.wishlist") }}
    </h1>
    <client-only>
      <ul v-if="theList.length" class="my-8 grid divide-y divide-slate-100">
        <LazyWishListItem
          v-for="product in theList"
          :key="product.databaseId"
          :product="product"
        />
      </ul>
      <div
        v-else
        class="flex min-h-[600px] items-center justify-center text-center text-slate-500"
      >
        <p>{{ $t("messages.shop.wishlistNoItems") }}</p>
      </div>
    </client-only>
  </div>
</template>

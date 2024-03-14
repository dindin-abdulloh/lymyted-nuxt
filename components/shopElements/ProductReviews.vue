<script setup>
defineProps({
  product: { type: Object, default: null },
})
</script>

<template>
  <div class="flex flex-col items-start gap-32">
    <div class="prose flex max-w-sm gap-4">
      <ReviewsScore
        v-if="product.reviews"
        :reviews="product.reviews"
        :product-id="product.databaseId"
      />
    </div>
    <div
      v-if="product.reviews?.edges && product.reviews.edges.length"
      class="flex-1 divide-y"
    >
      <div
        v-for="review in product.reviews.edges"
        :key="review.id"
        class="my-2 py-8"
      >
        <div class="flex items-center gap-4">
          <img
            v-if="review.node.author.node.avatar"
            :src="review.node.author.node.avatar.url"
            class="h-12 w-12 rounded-full"
          />
          <div class="grid gap-1">
            <div class="text-sm">
              <span class="font-semibold">{{
                review.node.author.node.name
              }}</span>
              <span class="italic text-slate-400">
                –
                {{
                  new Date(review.node.date).toLocaleString(
                    $t("messages.general.langCode"),
                    { month: "long", day: "numeric", year: "numeric" },
                  )
                }}</span
              >
            </div>
            <div class="inline-flex items-center">
              <Icon
                v-for="i in 5"
                :key="i"
                name="ion:star"
                :size="12"
                :color="review.rating < i ? '#ccc' : '#FBBE24'"
                class="mr-[2px]"
              />
            </div>
          </div>
        </div>
        <div
          class="prose-sm mt-4 italic text-slate-700"
          v-html="review.node.content"
        ></div>
      </div>
    </div>
  </div>
</template>

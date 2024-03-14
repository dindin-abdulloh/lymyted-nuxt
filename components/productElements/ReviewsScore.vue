<script setup>
const props = defineProps({
  reviews: { type: Object, default: null },
  productId: { type: Number, default: null },
  size: { type: Number, default: 21 },
})

const numberAndPercentageOfEachRating = computed(() => {
  const ratings = [0, 0, 0, 0, 0]
  props.reviews.edges.forEach((review) => {
    ratings[review.rating - 1] += 1
  })
  const total = ratings.reduce((a, b) => a + b, 0)
  return ratings
    .map((count, index) => {
      const percentage = (count / total) * 100
      return { count, percentage, rating: index + 1 }
    })
    .reverse()
})

const show = ref(false)
const hovered = ref(0)
const rating = ref(null)
const content = ref(null)
const authorEmail = ref(null)
const errorMessage = ref("")
const successMessage = ref("")
const isPending = ref(false)

function setHovered(i) {
  hovered.value = i
}

function resetHovered() {
  hovered.value = 0
}

async function addComment() {
  const variables = {
    commentOn: props.productId,
    author: authorEmail.value.split("@")[0],
    content: content.value,
    rating: rating.value,
    authorEmail: authorEmail.value,
  }
  try {
    isPending.value = true
    await GqlWriteReview(variables)
    successMessage.value = "Your review is awaiting approval"
    setTimeout(() => {
      successMessage.value = ""
      show.value = false
    }, 4000)
  } catch (error) {
    errorMessage.value = error?.gqlErrors?.[0].message
    setTimeout(() => {
      errorMessage.value = ""
    }, 5000)
  } finally {
    isPending.value = false
  }
}
</script>

<template>
  <div>
    <div v-if="reviews.edges.length" class="my-2">
      <StarRating
        :rating="reviews.averageRating"
        :hide-count="true"
        class="mr-2 text-sm"
      />
      <span class="text-sm">
        {{ $t("messages.general.basedOn") }} {{ reviews.edges.length }}
        {{ $t("messages.shop.reviews") }}</span
      >
    </div>
    <div class="bars my-4">
      <div
        v-for="rating in numberAndPercentageOfEachRating"
        :key="rating"
        class="flex items-center gap-4"
      >
        <div class="flex items-center gap-1 text-sm">
          {{ rating.rating }}
          <Icon class="text-yellow-400" name="ion:star" />
        </div>
        <div class="relative flex-1">
          <div class="h-2.5 w-full rounded-full bg-slate-200"></div>
          <div
            class="absolute left-0 top-0 h-2.5 rounded-full bg-yellow-400"
            :style="{ width: rating.percentage + '%' }"
          ></div>
        </div>
      </div>
    </div>
    <div class="mb-2 mt-10 text-xl text-slate-900">Share your thoughts</div>
    <div class="mb-4 text-sm">
      If you have used this product, we would love to hear about your
      experience.
    </div>
    <button
      class="w-full rounded-lg border p-2 text-center"
      @click="show = !show"
    >
      {{ show ? $t("messages.shop.close") : $t("messages.shop.writeReview") }}
    </button>
    <transition class="transform transition-all ease-in-out" name="scale-y">
      <form v-if="show" class="writeReview" @submit.prevent="addComment">
        <div class="w-full text-slate-500">
          <div class="mt-3 grid gap-2 rounded-lg border p-5">
            <div class="mb-1.5 block text-center">
              <label class="relative m-auto block text-center text-sm"
                >{{ $t("messages.shop.rateReview") }}
                <span class="text-red-500">*</span></label
              >
              <div class="relative mt-2 flex justify-center gap-1">
                <label
                  v-for="i in 5"
                  :key="i"
                  class="grid rounded p-1"
                  :class="
                    rating < i && i > hovered ? 'disable-star' : 'checked-star'
                  "
                  @mouseover="setHovered(i)"
                  @mouseout="resetHovered"
                >
                  <input
                    v-model="rating"
                    type="radio"
                    class="absolute appearance-none overflow-hidden opacity-0"
                    name="rating"
                    :value="i"
                    required
                  />
                  <Icon name="ion:star" :size="size + ''" />
                </label>
              </div>
            </div>
            <div class="col-span-full w-full">
              <label for="content" class="mb-0.5 text-sm"
                >{{ $t("messages.shop.rateContent") }}
                <span class="text-red-500">*</span></label
              >
              <textarea
                id="content"
                v-model="content"
                class="w-full"
                placeholder="Great Quality"
                required
              ></textarea>
            </div>
            <div class="col-span-full w-full">
              <label for="author" class="mb-0.5 text-sm"
                >{{ $t("messages.shop.rateEmail") }}
                <span class="text-red-500">*</span></label
              >
              <input
                id="author"
                v-model="authorEmail"
                class="w-full"
                placeholder="example@example.com"
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
              />
            </div>
            <Transition name="scale-y" mode="out-in">
              <div
                v-if="errorMessage"
                class="my-4 text-sm text-red-500"
                v-html="errorMessage"
              ></div>
            </Transition>
            <Transition name="scale-y" mode="out-in">
              <div
                v-if="successMessage"
                class="my-4 text-sm text-green-500"
                v-html="successMessage"
              ></div>
            </Transition>
            <div class="col-span-full mt-3 w-full text-center">
              <button
                class="flex w-full items-center justify-center gap-4 rounded-md bg-amber-300 p-2 font-semibold text-amber-900 transition hover:bg-amber-400"
                type="submit"
              >
                <LoadingIcon
                  v-if="isPending"
                  stroke="4"
                  size="16"
                  color="#78350F"
                />
                <span>{{ $t("messages.shop.submit") }}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </transition>
  </div>
</template>

<style lang="postcss" scoped>
.disable-star {
  @apply border border-slate-300 bg-white text-slate-300 shadow-sm;
  transition: 0.15s ease-in-out;
}
.checked-star {
  @apply border border-amber-400 bg-amber-50 text-amber-400;
  transition: 0.15s ease-in-out;
  box-shadow: 0 0px 4px 0 rgb(249 191 59 / 21%);
}
.writeReview input,
.writeReview textarea {
  @apply w-full rounded-md border border-slate-300 bg-white px-4 py-2 shadow-sm outline-none;
}
</style>

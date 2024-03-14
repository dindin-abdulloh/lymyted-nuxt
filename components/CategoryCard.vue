<script setup lang="ts">
const { formatURI } = useHelpers()
interface Props {
  node: ProductCategory
}

const { node } = defineProps<Props>()
const imageSrc = node.image?.sourceUrl || "/images/placeholder.jpg"
</script>

<template>
  <NuxtLink
    v-if="node"
    :to="`/product-category/${formatURI(node.slug)}`"
    class="item relative flex snap-x snap-mandatory justify-start overflow-hidden rounded-2xl border border-white pl-2"
  >
    <NuxtImg
      v-if="node.image?.sourceUrl"
      width="250"
      height="300"
      class="skeleton absolute inset-0 h-full w-full object-cover"
      :src="imageSrc"
      :alt="node.image?.altText || node.name"
      :title="node.image?.title || node.name"
      loading="lazy"
      fit="inside"
      format="webp"
      densities="x1 x2"
    />
    <div
      class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black to-transparent opacity-50 md:h-1/2"
    />
    <div class="flex flex-col">
      <span
        class="font-titillium-web relative z-10 mb-1 mt-auto text-lg font-semibold capitalize text-white md:text-3xl"
        v-html="node.name"
      />
      <div
        class="font-titillium-web z-10 mb-2 flex flex-row items-center space-x-1 py-1 text-[0.5rem] text-white md:py-3 md:text-xs"
      >
        <span>Explore</span>
        <Icon name="ion:arrow-forward-outline" size="15" />
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="postcss" scoped>
.item {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  aspect-ratio: 4 / 5;
}
</style>

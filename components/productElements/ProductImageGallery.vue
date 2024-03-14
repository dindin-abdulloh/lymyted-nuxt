<script setup lang="ts">
defineProps({
  firstImage: { type: String, required: true },
  mainImage: { type: String, required: true },
  gallery: { type: Object, required: true },
  node: { type: Object, required: true },
})

const imageToShow = ref<number | null>(0)

const changeImage = (index: number | null): void => {
  imageToShow.value = index
}
</script>

<template>
  <div v-if="mainImage">
    <NuxtImg
      v-show="imageToShow === null"
      class="skeleton w-full max-w-full rounded-xl object-contain md:min-w-[350px]"
      width="700"
      height="700"
      fit="outside"
      format="webp"
      :src="firstImage"
      :alt="node.name"
      :title="node.name"
      fetchpriority="high"
    />
    <NuxtImg
      v-show="imageToShow === 0"
      class="skeleton w-full max-w-full rounded-xl object-contain md:min-w-[350px]"
      width="700"
      height="700"
      fit="outside"
      format="webp"
      :src="mainImage"
      :alt="node.name"
      :title="node.name"
      fetchpriority="high"
    />
    <NuxtImg
      v-for="(galleryImg, i) in gallery.nodes"
      v-show="imageToShow === i + 1"
      :key="i"
      class="skeleton w-full max-w-full rounded-xl object-contain md:min-w-[350px]"
      width="700"
      height="700"
      fit="outside"
      format="webp"
      :alt="galleryImg.altText || galleryImg.title || node.name"
      :title="galleryImg.title || node.name"
      :src="galleryImg.sourceUrl || '/images/placeholder.jpg'"
    />
    <div v-if="gallery.nodes.length" class="gallery-images my-4">
      <NuxtImg
        class="skeleton max-w-full cursor-pointer rounded-xl"
        width="110"
        height="140"
        format="webp"
        :src="firstImage"
        :alt="node.name"
        :title="node.name"
        @click.native="changeImage(null)"
      />
      <NuxtImg
        v-for="(galleryImg, i) in gallery.nodes"
        :key="i"
        class="skeleton max-w-full cursor-pointer rounded-xl"
        width="110"
        height="140"
        fit="outside"
        format="webp"
        :src="galleryImg.sourceUrl"
        :alt="galleryImg.altText || galleryImg.title || node.name"
        :title="galleryImg.title || node.name"
        @click.native="changeImage(i + 1)"
      />
    </div>
  </div>
</template>

<style>
.gallery-images {
  display: flex;
  overflow: auto;
  gap: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
}

.gallery-images img {
  width: 72px;
  aspect-ratio: 5/6;
  object-fit: cover;
}

@media (min-width: 768px) {
  .gallery-images {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));

    img {
      width: 100%;
    }
  }
}
</style>

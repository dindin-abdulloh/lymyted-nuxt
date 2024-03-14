<template>
  <div
    v-if="isAlive"
    class="relative flex h-16 w-full items-center overflow-hidden rounded-lg"
  >
    <TrashIcon
      class="absolute right-0 w-6 scale-0 transform transition-all"
      :class="{ 'scale-100': lengthX > 40, 'delete-ready': lengthX > 80 }"
    />
    <div
      ref="el"
      class="absolute inset-0 rounded-lg"
      :class="{ 'transition-all': !isSwiping }"
      :style="{ transform: isSwiping ? `translateX(-${lengthX}px)` : `none` }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useSwipe } from "@vueuse/core"
const emit = defineEmits(["remove"])

const isAlive = ref(true)
const el = ref(null)
const { isSwiping, lengthX } = useSwipe(el, {
  passive: true,
  onSwipeEnd() {
    if (lengthX.value > 80) {
      isAlive.value = false
      emit("remove")
    }
  },
})
</script>

<style lang="postcss">
.underlay {
  @apply absolute inset-0 flex items-center justify-end p-4 transition-all;
}
.delete-ready {
  @apply text-red-500;
}
</style>

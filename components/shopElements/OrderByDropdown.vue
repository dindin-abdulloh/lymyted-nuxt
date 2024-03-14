<script setup>
const { getOrderQuery, setOrderQuery } = await useSorting()
const selectedOrder = ref(getOrderQuery())
const orderby = ref(selectedOrder.value.orderBy || "date")
const order = ref(selectedOrder.value.order)

// Update the URL when the checkbox is changed
watch([orderby, order], () => {
  setOrderQuery(orderby.value, order.value)
})
</script>

<template>
  <div class="rounded-m isolate ml-auto inline-flex -space-x-px shadow-sm">
    <button
      class="relative inline-flex items-center rounded-l-md border border-slate-300 bg-white p-2 text-sm font-medium text-slate-500 hover:bg-slate-50 focus:z-20"
      aria-label="Sort"
      @click="order = order === 'ASC' ? 'DESC' : 'ASC'"
    >
      <Icon
        name="ion:filter-outline"
        size="18"
        :class="order === 'ASC' ? 'rotate-180' : ''"
        class="transform-origin-center transform transition-transform"
      />
    </button>
    <select
      v-model="orderby"
      class="rounded-l-none bg-white"
      aria-label="Order by"
    >
      <option value="date">{{ $t("messages.general.latest") }}</option>
      <option value="alphabetically">
        {{ $t("messages.general.alphabetically") }}
      </option>
      <option value="price">{{ $t("messages.shop.price") }}</option>
      <option value="rating">{{ $t("messages.shop.rating") }}</option>
      <option value="discount">{{ $t("messages.shop.discount") }}</option>
    </select>
  </div>
</template>

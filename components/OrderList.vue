<script setup>
const router = useRouter()
const { formatDate, scrollToTop } = useHelpers()
const { getOrders, orders } = useAuth()

if (orders.value === null) getOrders()

const refresh = () => {
  orders.value = null
  scrollToTop()
  getOrders()
}

const goToOrder = (orderNumber) => {
  router.push(`/order-summary/${orderNumber}`)
}
</script>

<template>
  <div
    class="flex min-h-[250px] items-center justify-center rounded-lg bg-white p-12 shadow"
  >
    <div v-if="orders && orders.length" class="w-full">
      <table class="w-full table-auto text-left" aria-label="Order List">
        <thead>
          <tr>
            <th>{{ $t("messages.shop.order") }}</th>
            <th>{{ $t("messages.general.date") }}</th>
            <th>{{ $t("messages.general.status") }}</th>
            <th class="text-right">{{ $t("messages.shop.total") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.orderNumber"
            class="cursor-pointer hover:underline"
            @click="goToOrder(order.orderNumber)"
          >
            <td class="rounded-l-lg">
              {{ order.orderNumber }}
            </td>
            <td>{{ formatDate(order.date) }}</td>
            <td>
              <OrderStatusLabel :status="order.status" />
            </td>
            <td class="rounded-r-lg text-right">
              {{ order.total }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-8 flex w-full justify-center text-center">
        <button
          type="button"
          class="flex items-center gap-1 rounded p-2 text-sm leading-none hover:bg-slate-50"
          @click="refresh"
        >
          <span>Reresh list</span>
          <Icon name="ion:refresh-outline" />
        </button>
      </div>
    </div>
    <div
      v-else-if="orders && orders.length === 0"
      class="flex min-h-[250px] items-center justify-center text-lg text-slate-500"
    >
      No orders found.
    </div>
    <LoadingIcon v-else size="24" stroke="2" />
  </div>
</template>

<style lang="postcss" scoped>
tbody tr:nth-child(odd) {
  background-color: #fafafa;
}

tbody tr {
  @apply text-sm text-slate-500 hover:text-slate-800;
}

td,
th {
  @apply px-3 py-2;
}
</style>

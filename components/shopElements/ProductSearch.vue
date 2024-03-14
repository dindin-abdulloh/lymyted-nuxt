<script setup>
const { getSearchQuery, setSearchQuery, clearSearchQuery } = useSearching()
const searchQuery = ref(getSearchQuery())

const reset = () => {
  clearSearchQuery()
  searchQuery.value = ""
}

watch(getSearchQuery, (value) => {
  if (!value) reset()
})
</script>

<template>
  <form
    class="relative flex-1 items-center -space-x-px rounded-md shadow-sm"
    @submit.prevent="setSearchQuery(searchQuery)"
  >
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="$t('messages.shop.searchProducts')"
      class="z-0 inline-flex w-full items-center rounded-md bg-[#F8F7F7] p-2 pr-16 text-sm text-slate-500 outline-none"
    />
    <span
      v-if="searchQuery"
      class="absolute right-11 z-10 flex cursor-pointer items-center gap-1 rounded-xl bg-primary bg-opacity-10 px-1 py-1 text-xs text-primary hover:bg-opacity-20"
      @click="reset"
    >
      <Icon name="ion:close-outline" size="18" />
    </span>
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="pointer-events-none absolute right-2 z-10"
    >
      <rect width="32" height="32" rx="12" fill="#12ABF3" />
      <path
        d="M15.1667 23.293C10.6834 23.293 7.04175 19.6513 7.04175 15.168C7.04175 10.6846 10.6834 7.04297 15.1667 7.04297C19.6501 7.04297 23.2917 10.6846 23.2917 15.168C23.2917 19.6513 19.6501 23.293 15.1667 23.293ZM15.1667 8.29297C11.3751 8.29297 8.29175 11.3763 8.29175 15.168C8.29175 18.9596 11.3751 22.043 15.1667 22.043C18.9584 22.043 22.0417 18.9596 22.0417 15.168C22.0417 11.3763 18.9584 8.29297 15.1667 8.29297Z"
        fill="white"
      />
      <path
        d="M22.8001 24.9917C22.7334 24.9917 22.6667 24.9833 22.6084 24.975C22.2167 24.925 21.5084 24.6583 21.1084 23.4667C20.9001 22.8417 20.9751 22.2167 21.3167 21.7417C21.6584 21.2667 22.2334 21 22.8917 21C23.7417 21 24.4084 21.325 24.7084 21.9C25.0084 22.475 24.9251 23.2083 24.4501 23.9167C23.8584 24.8083 23.2167 24.9917 22.8001 24.9917ZM22.3001 23.075C22.4417 23.5083 22.6417 23.725 22.7751 23.7417C22.9084 23.7583 23.1584 23.6 23.4167 23.225C23.6584 22.8667 23.6751 22.6083 23.6167 22.4917C23.5584 22.375 23.3251 22.25 22.8917 22.25C22.6334 22.25 22.4417 22.3333 22.3334 22.475C22.2334 22.6167 22.2167 22.8333 22.3001 23.075Z"
        fill="white"
      />
    </svg>
  </form>
</template>

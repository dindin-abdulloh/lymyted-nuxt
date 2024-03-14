<template>
  <form
    v-if="customer"
    class="rounded-lg bg-white shadow"
    @submit.prevent="saveChanges"
  >
    <div class="grid gap-6 p-8 md:grid-cols-2">
      <h3 class="col-span-full text-xl font-semibold">
        {{ $t("messages.account.personalInfo") }}
      </h3>

      <div class="w-full">
        <label for="first-name">{{ $t("messages.billing.firstName") }}</label>
        <input v-model="customer.firstName" placeholder="John" type="text" />
      </div>

      <div class="w-full">
        <label for="last-name">{{ $t("messages.billing.lastName") }}</label>
        <input v-model="customer.lastName" placeholder="Doe" type="text" />
      </div>
      <div class="col-span-full w-full">
        <label for="email">{{ $t("messages.billing.email") }}</label>
        <input
          v-model="customer.email"
          placeholder="johndoe@email.com"
          type="email"
        />
      </div>
    </div>
    <div
      class="sticky bottom-0 col-span-full rounded-b-lg border-t bg-white bg-opacity-75 p-4 backdrop-blur-sm"
    >
      <button
        class="ml-auto flex items-center gap-4 rounded-md bg-primary px-4 py-2 font-semibold text-white"
      >
        <LoadingIcon v-if="loading" color="#fff" size="20" />
        <span>{{ buttonText }}</span>
      </button>
    </div>
  </form>
</template>

<script setup>
const { viewer, customer } = useAuth()

const loading = ref(false)
const buttonText = computed(() =>
  loading.value ? "Updating..." : "Update Details",
)

async function saveChanges() {
  loading.value = true
  try {
    const { updateCustomer } = await GqlUpdateCustomer({
      input: {
        id: viewer.value.id,
        firstName: customer.value.firstName,
        lastName: customer.value.lastName,
      },
    })

    if (updateCustomer) loading.value = false
  } catch (error) {
    loading.value = false
  }
}
</script>

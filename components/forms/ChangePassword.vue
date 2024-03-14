<template>
  <form class="mt-4 rounded-lg bg-white shadow">
    <div class="grid gap-6 p-8 md:grid-cols-2">
      <h3 class="col-span-full text-xl font-semibold">
        {{ $t("messages.account.changePassword") }}
      </h3>
      <div class="w-full">
        <label for="current-password">{{
          $t("messages.account.currentPassword")
        }}</label>
        <input
          v-model="password.current"
          placeholder="••••••••••"
          type="password"
          required
        />
      </div>
      <br class="hidden md:block" />

      <div class="w-full">
        <label for="new-password">{{
          $t("messages.account.newPassword")
        }}</label>
        <input
          v-model="password.new"
          placeholder="••••••••••"
          type="password"
          required
        />
      </div>

      <div class="w-full">
        <label for="new-password-confirm">{{
          $t("messages.account.confirmNewPassword")
        }}</label>
        <input
          v-model="password.confirm"
          placeholder="••••••••••"
          type="password"
          required
        />
      </div>
    </div>

    <div
      class="sticky bottom-0 col-span-full rounded-b-lg border-t bg-white bg-opacity-75 p-4 backdrop-blur-sm"
    >
      <button
        class="ml-auto flex items-center gap-4 rounded-md bg-primary px-4 py-2 font-semibold text-white"
      >
        {{ $t("messages.account.updatePassword") }}
      </button>
    </div>
  </form>
</template>

<script setup>
const password = ref({})
</script>

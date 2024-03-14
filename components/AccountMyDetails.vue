<template>
  <div class="account-form grid gap-8">
    <PersonalInformation />
    <BillingAndShipping />
    <ChangePassword />
  </div>
</template>

<style lang="postcss">
.account-form input[type="text"],
.account-form input[type="email"],
.account-form input[type="tel"],
.account-form input[type="password"],
.account-form textarea,
.account-form .StripeElement,
.account-form select {
  @apply block w-full rounded-md border bg-white px-4 py-2 outline-none md:bg-slate-50;
}

.account-form label {
  @apply mb-1 inline-block text-xs uppercase text-slate-600;
}
</style>

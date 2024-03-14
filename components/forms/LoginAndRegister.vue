<template>
  <div class="mx-auto my-16 min-h-[600px] max-w-lg lg:my-24">
    <div class="flex flex-col items-center">
      <h1 class="text-xl font-semibold lg:text-3xl">
        {{ $t("messages.account.loginToAccount") }}
      </h1>
      <div v-if="formView == 'login'" class="my-2 text-center">
        {{ $t("messages.account.noAccount") }}
        <a
          class="cursor-pointer font-semibold text-primary"
          @click="formView = 'register'"
          >{{ $t("messages.account.accountRegister") }}</a
        >.
      </div>
      <div v-if="formView == 'register'" class="my-2 text-center">
        {{ $t("messages.account.hasAccount") }}
        <a
          class="cursor-pointer font-semibold text-primary"
          @click="formView = 'login'"
          >{{ $t("messages.general.please") }}
          {{ $t("messages.account.accountLogin") }}</a
        >.
      </div>
    </div>
    <form class="mt-6" @submit.prevent="handleFormSubmit(userInfo)">
      <label
        v-if="formView == 'register' || formView == 'forgotPassword'"
        for="email"
        >Email <span class="text-red-500">*</span> <br />
        <input
          id="email"
          v-model="userInfo.email"
          placeholder="Email"
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
        />
      </label>
      <p v-if="formView == 'forgotPassword'" class="text-sm text-slate-500">
        Please enter your email address and we will send you a link to reset
        your password.
      </p>
      <div v-if="formView != 'forgotPassword'">
        <label for="username"
          >{{ $t("messages.account.username") }}
          <span class="text-red-500">*</span> <br />
          <input
            id="username"
            v-model="userInfo.username"
            placeholder="Username"
            type="text"
            required
          />
        </label>
        <label for="password"
          >{{ $t("messages.account.password") }}
          <span class="text-red-500">*</span> <br />
          <PasswordInput
            id="password"
            v-model="userInfo.password"
            class="mb-4"
            class-name="border rounded-lg w-full p-3 px-4 bg-white"
            placeholder="Password"
            :required="true"
          />
        </label>
      </div>
      <Transition name="scale-y" mode="out-in">
        <div
          v-if="message"
          class="my-4 text-sm text-green-500"
          v-html="message"
        ></div>
      </Transition>
      <Transition name="scale-y" mode="out-in">
        <div
          v-if="errorMessage"
          class="my-4 text-sm text-red-500"
          v-html="errorMessage"
        ></div>
      </Transition>
      <button class="mt-4 flex items-center justify-center gap-4 text-lg">
        <LoadingIcon v-if="isPending" stroke="4" size="16" color="#fff" />
        <span>{{ buttonText }}</span>
      </button>
    </form>
    <div
      v-if="formView == 'login'"
      class="my-8 cursor-pointer text-center"
      @click="formView = 'forgotPassword'"
    >
      Forgot password?
    </div>
    <div
      v-if="formView == 'forgotPassword'"
      class="my-8 cursor-pointer text-center"
      @click="formView = 'login'"
    >
      Back to login
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
const { loginUser, isPending, registerUser, sendResetPasswordEmail } = useAuth()
const userInfo = ref({ email: "", password: "", username: "" })
const formView = ref("login")
const message = ref("")
const errorMessage = ref("")

const login = async (userInfo) => {
  const { success, error } = await loginUser(userInfo)
  switch (error) {
    case "invalid_username":
      errorMessage.value = t("messages.error.invalidUsername")
      break
    case "incorrect_password":
      errorMessage.value = t("messages.error.incorrectPassword")
      break
    default:
      errorMessage.value = error
      break
  }

  if (success) {
    errorMessage.value = ""
    message.value = t("messages.account.loggingIn")
  }
}

const handleFormSubmit = async (userInfo) => {
  if (formView.value === "register") {
    const { success, error } = await registerUser(userInfo)
    if (success) {
      errorMessage.value = ""
      message.value =
        t("messages.account.accountCreated") +
        " " +
        t("messages.account.loggingIn")
      setTimeout(() => {
        login(userInfo)
      }, 2000)
    } else {
      errorMessage.value = error
    }
  } else if (formView.value === "forgotPassword") {
    resetPassword(userInfo)
  } else {
    login(userInfo)
  }
}

const resetPassword = async (userInfo) => {
  const { success, error } = await sendResetPasswordEmail(userInfo.email)
  if (success) {
    errorMessage.value = ""
    message.value =
      "If your email address is registered with us, you will receive an email with a link to reset your password."
  } else {
    errorMessage.value = error
  }
}

const buttonText = computed(() => {
  if (formView.value === "login") {
    return t("messages.account.login")
  } else if (formView.value === "register") {
    return t("messages.account.register")
  } else if (formView.value === "forgotPassword") {
    return t("messages.account.sendPasswordResetEmail")
  }
  return "login"
})
</script>

<style lang="postcss" scoped>
input,
button {
  @apply mb-4 w-full rounded-lg border bg-white p-3 px-4;
}

form button {
  @apply rounded-lg bg-primary-dark px-8 py-3 font-bold text-white;
}
</style>

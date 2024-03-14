<script setup lang="ts">
const showPassword = ref(false)

const { modelValue, className, placeholder, required } = defineProps({
  modelValue: { type: String, required: true },
  className: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  required: { type: Boolean, default: false },
})

const emit = defineEmits(["update:modelValue"])

const handleInputChanged = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit("update:modelValue", target.value)
}
</script>

<template>
  <div class="relative flex w-full items-center">
    <input
      :type="showPassword ? 'text' : 'password'"
      class="flex flex-1 items-center"
      :value="modelValue"
      :class="className"
      :placeholder="placeholder"
      :required="required"
      @input="handleInputChanged"
    />
    <Icon
      v-if="showPassword"
      name="ion:eye-outline"
      size="20"
      class="absolute right-4 cursor-pointer"
      @click="showPassword = !showPassword"
    />
    <Icon
      v-else
      name="ion:eye-off-outline"
      size="20"
      class="absolute right-4 cursor-pointer"
      @click="showPassword = !showPassword"
    />
  </div>
</template>

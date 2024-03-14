<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const defaultClient = runtimeConfig?.public?.["graphql-client"]?.clients
  ?.default as { host: string } | undefined

const { link } = defineProps<{ link: string }>()

const gqlEndpoint = defaultClient?.host ?? null
const wpBase = gqlEndpoint?.replace("/graphql", "") ?? null
const formattedLink = wpBase + link
const linkStartsWithWpAdmin = link?.startsWith("/wp-admin") || false
</script>

<template>
  <DevOnly>
    <ClientOnly>
      <a
        v-if="linkStartsWithWpAdmin && wpBase && link"
        :href="formattedLink"
        target="_blank"
        class="wp-admin-link"
        title="This is a dev-only link, it will not be visible in production."
      >
        <span class="link">
          <slot />
        </span>
        <Icon name="ion:open-outline" size="14" />
      </a>
    </ClientOnly>
  </DevOnly>
</template>

<style scoped lang="postcss">
.wp-admin-link {
  @apply inline-flex items-center gap-1 rounded border-b border-yellow-500 bg-yellow-400 px-2 py-1 text-xs uppercase leading-tight text-yellow-900 transition-all duration-100 ease-in-out;

  &:hover {
    @apply border-b border-yellow-600 bg-yellow-500;
  }
}
</style>

<script setup lang="ts">
defineProps<{
  menus?: MenuItem[]
}>()
</script>

<template>
  <nav class="mt-4 hidden lg:flex">
    <ul class="mx-auto flex items-center justify-center space-x-4">
      <li v-for="item in menus" :key="item.id">
        <template
          v-if="
            item?.children?.nodes?.length && item?.children?.nodes?.length > 0
          "
        >
          <!-- HoverCard equivalent in Vue -->
          <HoverCard>
            <HoverCardTrigger as-child>
              <NuxtLink
                :href="`/product-category/${item.slug}`"
                class="flex items-center px-3 py-2 text-slate-700 hover:text-slate-900"
              >
                {{ item.name }}
                <span class="ml-2">
                  <!-- ArrowDownIcon equivalent in Vue -->
                </span>
              </NuxtLink>
            </HoverCardTrigger>
            <HoverCardContent class="rounded-md bg-white p-2 shadow-lg">
              <ul class="space-y-2">
                <li v-for="child in item.children.nodes" :key="child.id">
                  <NuxtLink
                    :href="`/product-category/${child.slug}`"
                    class="block px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  >
                    {{ child.name }}
                  </NuxtLink>
                </li>
              </ul>
            </HoverCardContent>
          </HoverCard>
        </template>
        <template v-else>
          <!-- Regular link for items without subItems -->
          <NuxtLink
            :href="`/product-category/${item.slug}`"
            class="flex items-center px-3 py-2 text-slate-700 hover:text-slate-900"
          >
            {{ item.name }}
          </NuxtLink>
        </template>
      </li>
    </ul>
  </nav>
</template>

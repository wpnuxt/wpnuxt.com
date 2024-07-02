<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<Ref<NavItem[]>>('navigation')

const { navPageFromPath } = useContentHelpers()
const navigationLinks = computed(() => {
  return mapContentNavigation(navPageFromPath('/docs', navigation.value)?.children || [])
})
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <template #top>
            <UContentSearchButton size="md" />
          </template>
          <UNavigationTree
            :links="navigationLinks"
            default-open
            :multiple="false"
          />
        </UAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>

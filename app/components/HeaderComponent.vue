<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<NavItem[]>('navigation', [])

const { header } = useAppConfig()

const links = [
  {
    label: 'Demo',
    icon: 'i-ph-monitor',
    to: 'https://demo.wpnuxt.com',
    target: '_blank'
  }, {
    label: 'Online Playground',
    icon: 'i-ph-play-duotone',
    to: 'https://stackblitz.com/github/wpnuxt/wpnuxt-core?file=playground%2Fapp%2Fpages%2Findex.vue',
    target: '_blank'
  }]
</script>

<template>
  <UHeader :links="[...mapContentNavigation(navigation), ...links]">
    <template #logo>
      <LogoComponent class="h-6 w-auto" />
    </template>

    <template #right>
      <UContentSearchButton
        v-if="header?.search"
        :label="null"
      />

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'gray', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
  </UHeader>
</template>

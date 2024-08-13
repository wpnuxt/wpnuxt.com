<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
  ogImage: 'https://wpnuxt.com/social-card.png',
  twitterImage: 'https://wpnuxt.com/social-card.png'
})
</script>

<template>
  <div>
    <div class="gradient" />
    <ULandingHero
      direction="vertical"
      :ui="{ base: 'relative z-[1]', container: 'flex flex-col gap-6 lg:gap-8', description: 'mt-6 text-lg/8 lg:px-28 text-gray-400' }"
    >
      <div class="flex w-full justify-center order-first">
        <UBadge
          class="w-fit"
          color="primary"
          variant="soft"
          size="md"
        >
          this brand new Nuxt module is still in alpha stage
        </UBadge>
      </div>
      <template #title>
        <span v-html="page.hero?.title" />
      </template>
      <template #description>
        <span v-html="page.hero?.description" />
      </template>
      <template #links>
        <UButton
          color="primary"
          label="Get Started"
          icon="i-ph-rocket-launch-duotone"
          to="/docs/getting-started/installation"
          size="xl"
        />
        <UButton
          size="xl"
          color="white"
          icon="i-ph-monitor"
          label="WPNuxt Demo"
          to="https://demo.wpnuxt.com"
          target="_blank"
        />
      </template>
    </ULandingHero>

    <ULandingSection
      v-for="(section, sectionIndex) of page.sections"
      :key="sectionIndex"
      v-bind="section"
    >
      <template
        v-if="section.title"
        #title
      >
        <span
          class="text-2xl md:text-4xl"
          v-html="section?.title"
        />
      </template>

      <template
        v-if="section.description"
        #description
      >
        <span v-html="section.description" />
      </template>

      <template #features>
        <UPageGrid>
          <ULandingCard
            v-for="card in section.toolsCards"
            :key="card.title"
            :to="card.to"
            :icon="card.icon"
            :title="card.title"
            :description="card.description"
            :ui="{
              to: 'hover:ring-2 dark:hover:ring-gray-500 hover:ring-gray-500 hover:bg-gray-100/50',
              icon: {
                base: 'w-10 h-10 flex-shrink-0 dark:text-gray-100'
              },
              body: {
                base: 'h-full',
                background: 'dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-950 bg-gradient-to-b from-gray-50 to-gray-100'
              }
            }"
          />
        </UPageGrid>
      </template>

      <template #code>
        <MDC
          v-if="section.code"
          :value="section.code"
          tag="pre"
          class="prose prose-primary dark:prose-invert max-w-none"
        />
      </template>
    </ULandingSection>
  </div>
</template>

<style scoped lang="postcss">
.gradient {
  position: fixed;
  top: 25vh;
  width: 100%;
  height: 30vh;
  background: radial-gradient(70% 50% at 50% 50%, #00DC82 0%, rgba(0, 220, 130, 0.5) 10%);
  filter: blur(120px);
  opacity: 0.6;
  z-index: -1;
}
.dark .gradient {
  background: radial-gradient(70% 50% at 50% 50%, #00DC82 0%, rgba(0, 220, 130, 0) 100%);
}
</style>

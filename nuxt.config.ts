import { docsSource } from './docsSource.config'

export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: [
    'nuxt-content-twoslash',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxthq/studio',
    '@nuxtjs/plausible',
    '@wpnuxt/core',
    'nuxt-og-image'
  ],

  future: {
    compatibilityVersion: 4
  },

  wpNuxt: {
    wordpressUrl: 'https://wordpress.wpnuxt.com',
    downloadSchema: false
  },

  $development: {
    runtimeConfig: {
      public: {
        website: {
          url: 'http://localhost:3000'
        }
      }
    }
  },

  content: {
    navigation: {
      fields: ['titleTemplate']
    },
    sources: {
      docsSource
    },
    highlight: {
      theme: {
        default: 'monokai',
        light: 'light-plus',
        dark: 'monokai'
      },
      langs: [
        'js',
        'ts',
        'vue',
        'css',
        'scss',
        'sass',
        'html',
        'bash',
        'md',
        'mdc',
        'json',
        'graphql',
        'gql'
      ]
    }
  },

  twoslash: {
    floatingVueOptions: {
      classMarkdown: 'prose prose-primary dark:prose-invert'
    },
    // Skip Twoslash in dev to improve performance. Turn this on when you want to explictly test twoslash in dev.
    enableInDev: true,
    // Do not throw when twoslash fails, the typecheck should be down in github.com/nuxt/nuxt's CI
    throws: false
  },

  build: {
    // workaround fix for error: Cannot find module '/var/task/node_modules/shiki/dist/core.mjs'
    // https://github.com/nuxt/nuxt/issues/28127
    transpile: ['shiki']
  },

  colorMode: {
    disableTransition: true
  },

  routeRules: {
    '/api/search.json': { prerender: true }
  },

  typescript: {
    strict: false
  },

  experimental: {
    headNext: true,
    sharedPrerenderData: true,
    appManifest: true
  },

  plausible: {
    apiHost: 'https://wpnuxt.com/plio'
  },

  devtools: {
    enabled: false
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    },
    checker: {
      lintOnStart: true,
      fix: true
    }
  },

  compatibilityDate: '2024-07-05'
})

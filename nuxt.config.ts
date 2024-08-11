import { isWindows } from 'std-env'

function normalizedDirPath(path?: string) {
  if (!path || !isWindows) {
    return path
  }

  const windowsPath = path.replace(/\\/g, '/')
  return windowsPath.startsWith('file:///') ? windowsPath : `file:///${windowsPath}`
}

const docsSourceBase = normalizedDirPath(process.env.NUXT_DOCS_PATH)

const docsSource = {
  base: undefined,
  name: 'wpnuxt-docs',
  driver: 'github',
  repo: 'wpnuxt/wpnuxt-core',
  branch: 'main',
  dir: 'docs',
  prefix: '/1.docs',
  token: process.env.NUXT_GITHUB_TOKEN || ''
}
if (docsSourceBase) {
  docsSource.driver = 'fs'
  docsSource.base = docsSourceBase
}

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

  plausible: {
    apiHost: 'https://wpnuxt.com/plio'
  },

  wpNuxt: {
    wordpressUrl: 'https://wordpress.wpnuxt.com',
    generateComposables: {
      enabled: true,
      prefix: 'use'
    }
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

  ui: {
    icons: ['heroicons', 'simple-icons']
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

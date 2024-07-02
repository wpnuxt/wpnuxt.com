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
  repo: 'vernaillen/wpnuxt-module',
  branch: 'main',
  dir: 'docs/content',
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
    '@vernaillen/wpnuxt',
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
      theme: 'monokai',
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
  }
})

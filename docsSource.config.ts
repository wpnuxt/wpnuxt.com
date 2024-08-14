import { isWindows } from 'std-env'

function normalizedDirPath(path?: string) {
  if (!path || !isWindows) {
    return path
  }

  const windowsPath = path.replace(/\\/g, '/')
  return windowsPath.startsWith('file:///') ? windowsPath : `file:///${windowsPath}`
}

const coreDocsBase = normalizedDirPath(process.env.WPNUXT_CORE_DOCS_PATH)
const blocksDocsBase = normalizedDirPath(process.env.WPNUXT_BLOCKS_DOCS_PATH)
const authDocsBase = normalizedDirPath(process.env.WPNUXT_AUTH_DOCS_PATH)

const coreDocs = {
  base: undefined,
  name: 'wpnuxt-core-docs',
  driver: 'github',
  repo: 'wpnuxt/wpnuxt-core',
  branch: 'main',
  dir: 'docs',
  prefix: '/1.docs',
  token: process.env.NUXT_GITHUB_TOKEN || ''
}
if (coreDocsBase) {
  coreDocs.driver = 'fs'
  coreDocs.base = coreDocsBase
}

const blocksDocs = {
  base: undefined,
  name: 'wpnuxt-blocks-docs',
  driver: 'github',
  repo: 'wpnuxt/wpnuxt-blocks',
  branch: 'main',
  dir: 'docs',
  prefix: '/2.blocks',
  token: process.env.NUXT_GITHUB_TOKEN || ''
}
if (blocksDocsBase) {
  blocksDocs.driver = 'fs'
  blocksDocs.base = blocksDocsBase
}

const authDocs = {
  base: undefined,
  name: 'wpnuxt-auth-docs',
  driver: 'github',
  repo: 'wpnuxt/wpnuxt-auth',
  branch: 'main',
  dir: 'docs',
  prefix: '/3.auth',
  token: process.env.NUXT_GITHUB_TOKEN || ''
}
if (authDocsBase) {
  authDocs.driver = 'fs'
  authDocs.base = authDocsBase
}

export { coreDocs, blocksDocs, authDocs }

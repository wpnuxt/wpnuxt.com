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
export { docsSource }

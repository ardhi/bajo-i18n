import path from 'path'
import i18next, { hasLoadedNamespace } from 'i18next'
import sprintfPostProcessor from '../lib/sprintf-post-processor.js'

async function init () {
  const { eachPlugins, readConfig, importPkg, getConfig, log } = this.bajo.helper
  const spp = await sprintfPostProcessor.call(this)
  const _ = await importPkg('lodash::bajo')
  const opts = getConfig('bajoI18N', { clone: true })
  this.bajoI18N.resource = {}
  const ns = []
  await eachPlugins(async function ({ file, name }) {
    const lng = path.basename(file, path.extname(file))
    const content = await readConfig(file)
    _.merge(this.bajoI18N.resource, _.set({}, lng, _.set({}, name, content)))
  }, { glob: 'resource/*.*' })
  opts.resources = this.bajoI18N.resource
  opts.defaultNS = 'bajoI18N'
  opts.fallbackNS = 'bajoI18N'
  // opts.ns = ns
  await i18next.use(spp).init(opts)
  this.bajoI18N.instance = i18next
  log.debug(`Internationalization is active now, locale: %s`, opts.lng)
}

export default init

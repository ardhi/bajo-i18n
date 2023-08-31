import path from 'path'
import i18next from 'i18next'
import sprintfPostProcessor from '../lib/sprintf-post-processor.js'

async function init () {
  const { eachPlugins, readConfig, importPkg, getConfig, log } = this.bajo.helper
  const spp = await sprintfPostProcessor.call(this)
  const { merge, set, map, uniq } = await importPkg('lodash-es')
  const config = getConfig()
  this.bajoI18N.config.lng = config.lang
  this.bajoI18N.config.supportedLngs = uniq(map(this.bajoI18N.config.supportedLngs, l => l.split('-')[0]))
  this.bajoI18N.config.nonExplicitSupportedLngs = true
  const opts = getConfig('bajoI18N', { clone: true })
  this.bajoI18N.resource = {}
  await eachPlugins(async function ({ file, plugin }) {
    const lng = path.basename(file, path.extname(file))
    const main = lng.split('-')[0]
    if (this.bajoI18N.config.supportedLngs.includes(main)) {
      const content = await readConfig(file)
      merge(this.bajoI18N.resource, set({}, lng, set({}, plugin, content)))
    }
  }, { glob: 'resource/*.*' })
  opts.resources = this.bajoI18N.resource
  opts.defaultNS = 'bajoI18N'
  opts.fallbackNS = 'bajoI18N'
  // opts.ns = ns
  await i18next.use(spp).init(opts)
  this.bajoI18N.instance = i18next
  log.debug('Internationalization is active now, locale: %s', opts.lng)
}

export default init

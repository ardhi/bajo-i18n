import i18next from 'i18next'
import sprintfPostProcessor from '../lib/sprintf-post-processor.js'
import collectResources from '../lib/collect-resource.js'

async function init () {
  const { importPkg, getConfig, log } = this.bajo.helper
  const spp = await sprintfPostProcessor.call(this)
  const { map, uniq } = await importPkg('lodash-es')
  const config = getConfig()
  this.bajoI18N.config.lng = config.lang
  this.bajoI18N.config.fallbackLng = config.lang
  this.bajoI18N.config.supportedLngs = uniq(map(this.bajoI18N.config.supportedLngs, l => l.split('-')[0]))
  this.bajoI18N.config.nonExplicitSupportedLngs = true
  const opts = getConfig('bajoI18N', { clone: true })
  await collectResources.call(this, opts)
  opts.defaultNS = 'bajoI18N'
  opts.fallbackNS = 'bajoI18N'
  // opts.ns = ns
  await i18next.use(spp).init(opts)
  this.bajoI18N.instance = i18next
  log.debug('Internationalization is active now, locale: %s', opts.lng)
}

export default init

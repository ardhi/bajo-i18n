import i18next from 'i18next'
import sprintfPostProcessor from '../lib/sprintf-post-processor.js'
import collectResources from '../lib/collect-resource.js'

async function init () {
  const spp = await sprintfPostProcessor.call(this)
  const { map, uniq, cloneDeep } = this.app.bajo.lib._
  const config = cloneDeep(this.config)
  config.lang = this.app.bajo.config.lang
  config.supportedLngs = uniq(map(this.config.supportedLngs, l => l.split('-')[0]))
  config.nonExplicitSupportedLngs = true
  if (!config.supportedLngs.includes(config.lang)) {
    this.log.warn('Unsupported locale \'%s\', switched to the default one \'%s\'', config.lang, config.fallbackLng)
    config.lang = config.fallbackLng
  }
  this.config = config
  this.app.bajo.freeze(this.config)
  const opts = this.getConfig()
  opts.lng = opts.lang
  await collectResources.call(this, opts)
  opts.defaultNS = 'main'
  opts.fallbackNS = ['main', 'bajo', 'bajoI18N']
  await i18next.use(spp).init(opts)
  this.instance = i18next
  this.log.debug('Internationalization is active now, locale: %s', opts.lng)
}

export default init

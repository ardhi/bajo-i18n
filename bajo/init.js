import i18next from 'i18next'
import sprintfPostProcessor from '../lib/sprintf-post-processor.js'
import collectResources from '../lib/collect-resource.js'

async function init () {
  const spp = await sprintfPostProcessor.call(this)
  const { uniq } = this.app.bajo.lib._
  this.config.lang = this.app.bajo.config.lang
  this.config.supportedLngs = uniq(this.config.supportedLngs)
  this.config.nonExplicitSupportedLngs = true
  if (!this.config.supportedLngs.includes(this.config.lang)) {
    this.log.warn('Unsupported locale \'%s\', switched to the default one \'%s\'', this.config.lang, this.config.fallbackLng)
    this.config.lang = this.config.fallbackLng
  }
  this.config.defaultNS = this.app.bajo.mainNs
  this.config.fallbackNS = [this.config.defaultNS, this.app.bajo.name, this.name]
  const opts = this.getConfig()
  opts.lng = opts.lang
  await collectResources.call(this, opts)
  await i18next.use(spp).init(opts)
  this.instance = i18next
  this.log.debug('Internationalization is active now, locale: %s', opts.lng)
}

export default init

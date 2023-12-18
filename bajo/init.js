import i18next from 'i18next'
import sprintfPostProcessor from '../lib/sprintf-post-processor.js'
import collectResources from '../lib/collect-resource.js'

async function init () {
  const { importPkg, getConfig, log } = this.bajo.helper
  const spp = await sprintfPostProcessor.call(this)
  const { map, uniq, isPlainObject, merge, upperFirst } = await importPkg('lodash-es')
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
  this.bajo.transHandler = ({ msg, params = [], options = {} } = {}) => {
    if (isPlainObject(params[0])) {
      const ctx = merge({}, params[0] ?? {}, { ns: opts.ns })
      if (msg.startsWith('validation') && ctx.message && !i18next.exists(msg, { ns: opts.ns })) {
        const message = ctx.message
          .replace(/".*?" /, '')
          .replace(/^is /, '')
        return upperFirst(message)
      }
      msg = i18next.t(msg, ctx)
    } else {
      msg = i18next.t(msg, { ns: opts.ns, pkg: opts.pkg, postProcess: 'sprintf', sprintf: params })
    }
    return msg
  }
  log.debug('Internationalization is active now, locale: %s', opts.lng)
}

export default init

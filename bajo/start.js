import i18next from 'i18next'
import sprintfPostProcessor from '../lib/sprintf-post-processor.js'
import collectResources from '../lib/collect-resource.js'

async function start () {
  const spp = sprintfPostProcessor.call(this)
  const opts = this.getConfig()
  opts.lng = opts.lang
  delete opts.lang
  opts.resources = await collectResources.call(this)
  await i18next.use(spp).init(opts)
  this.instance = i18next
  this.log.debug('Internationalization is active now, locale: %s', opts.lng)
}

export default start

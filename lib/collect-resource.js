import path from 'path'

async function collectResources (options) {
  const { eachPlugins, readConfig, runHook, importPkg } = this.bajo.helper
  const { merge, set } = await importPkg('lodash-es')
  this.bajoI18N.resource = {}
  await eachPlugins(async function ({ file, plugin }) {
    const lng = path.basename(file, path.extname(file))
    const main = lng.split('-')[0]
    if (this.bajoI18N.config.supportedLngs.includes(main)) {
      const content = await readConfig(file)
      await runHook('bajoI18N:beforeResourceMerge', plugin, lng, content) // BUG: should only listen on ONE plugin
      merge(this.bajoI18N.resource, set({}, lng, set({}, plugin, content)))
    }
  }, { glob: 'resource/*.*', extend: 'resource' })
  options.resources = this.bajoI18N.resource
}

export default collectResources

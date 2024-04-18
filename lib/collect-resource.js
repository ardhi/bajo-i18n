import path from 'path'

async function collectResources (options) {
  const { eachPlugins, readConfig, runHook } = this.bajo.helper
  const { merge, set } = this.bajo.helper._
  this.bajoI18N.resource = {}
  await eachPlugins(async function ({ file, plugin, alias }) {
    const lng = path.basename(file, path.extname(file))
    const main = lng.split('-')[0]
    if (this.bajoI18N.config.supportedLngs.includes(main)) {
      const content = await readConfig(file)
      await runHook(`bajoI18N.${alias}:beforeResourceMerge`, lng, content)
      merge(this.bajoI18N.resource, set({}, lng, set({}, plugin, content)))
    }
  }, { glob: 'resource/*.*', extend: 'resource' })
  options.resources = this.bajoI18N.resource
}

export default collectResources

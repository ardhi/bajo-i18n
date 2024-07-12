import path from 'path'

async function collectResources (options) {
  const { eachPlugins, readConfig, runHook } = this.app.bajo
  const { merge, set } = this.app.bajo.lib._
  const resource = {}
  const me = this
  await eachPlugins(async function ({ file, ns, alias }) {
    const lng = path.basename(file, path.extname(file))
    const main = lng.split('-')[0]
    if (me.config.supportedLngs.includes(main)) {
      const content = await readConfig(file)
      await runHook(`bajoI18N.${alias}:beforeResourceMerge`, lng, content)
      merge(resource, set({}, lng, set({}, ns, content)))
    }
  }, { glob: 'resource/*.*', baseNs: 'bajoI18N', useBajo: true })
  options.resources = resource
}

export default collectResources

import path from 'path'

async function collectResources () {
  const { eachPlugins, readConfig } = this.app.bajo
  const { merge, set, forOwn } = this.lib._
  const resource = {}
  const me = this
  await eachPlugins(async function ({ file, ns, alias }) {
    const lng = path.basename(file, path.extname(file))
    if (me.config.supportedLngs.includes(lng)) {
      const content = await readConfig(file, { ns })
      forOwn(content, (v, k) => {
        if (v === '') content[k] = k
      })
      // await runHook(`bajoI18N.${alias}:beforeResourceMerge`, lng, content)
      merge(resource, set({}, lng, set({}, ns, content)))
    }
  }, { glob: 'resource/*.*', prefix: 'bajoI18N', useBajo: true })
  return resource
}

export default collectResources

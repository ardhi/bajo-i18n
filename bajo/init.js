import path from 'path'
import i18next from 'i18next'

async function init () {
  const { eachPlugins, readConfig, importPkg, getConfig } = this.bajo.helper
  const _ = await importPkg('lodash::bajo')
  const opts = getConfig('bajoI18N', { clone: true })
  this.bajoI18N.resource = {}
  await eachPlugins(async function ({ file, name }) {
    const lng = path.basename(file, path.extname(file))
    const content = await readConfig(file)
    _.merge(this.bajoI18N.resource, _.set({}, lng, content))
  }, { glob: 'resource/*.*' })
  opts.resources = this.bajoI18N.resource
  await i18next.init(opts)
  this.bajoI18N.instance = i18next
}

export default init

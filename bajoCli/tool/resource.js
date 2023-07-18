async function resource (path, args) {
  const { importPkg, print, getConfig, saveAsDownload } = this.bajo.helper
  const { prettyPrint } = this.bajoCli.helper
  const { get, isEmpty } = await importPkg('lodash-es')
  const stripAnsi = await importPkg('bajo-cli:strip-ansi')
  const config = getConfig()
  const subPath = args.length === 0 ? '' : `.${args[0].replaceAll(':', '.')}`
  let result = get(this, `bajoI18N.resource${subPath}`, {})
  print.info('Done!')
  result = config.pretty ? (await prettyPrint(result, false, false)) : JSON.stringify(result, null, 2)
  if (config.save) {
    const file = `/${path}/${isEmpty(subPath) ? 'all' : subPath}.${config.pretty ? 'txt' : 'json'}`
    await saveAsDownload(file, stripAnsi(result), 'bajoI18N')
  } else console.log(result)
}

export default resource

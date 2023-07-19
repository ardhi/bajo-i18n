async function resource (path, args) {
  const { importPkg, print, getConfig, saveAsDownload } = this.bajo.helper
  const { prettyPrint } = this.bajoCli.helper
  const { get, isEmpty, keys, map } = await importPkg('lodash-es')
  const [stripAnsi, select] = await importPkg('bajo-cli:strip-ansi', 'bajo-cli:@inquirer/select')
  const config = getConfig()
  let subPath = args.length === 0 ? '' : `.${args[0].replaceAll(':', '.')}`
  if (isEmpty(subPath)) {
    let choices = map(keys(this.bajoI18N.resource || {}), k => ({ value: k }))
    const lang = await select({
      message: print.__('Please choose one of these locales:'),
      choices
    })
    subPath += '.' + lang
    choices = map(keys(get(this, `bajoI18N.resource${subPath}`, {})), k => ({ value: k }))
    choices.unshift({ value: '', name: 'all' })
    const ns = await select({
      message: print.__('Please choose one of these namespaces'),
      choices
    })
    subPath += isEmpty(ns) ? '' : ('.' + ns)
  }
  let result = get(this, `bajoI18N.resource${subPath}`, {})
  print.info('Done!')
  result = config.pretty ? (await prettyPrint(result, false, false)) : JSON.stringify(result, null, 2)
  if (config.save) {
    const file = `/${path}/${isEmpty(subPath) ? 'all' : subPath}.${config.pretty ? 'txt' : 'json'}`
    await saveAsDownload(file, stripAnsi(result), 'bajoI18N')
  } else console.log(result)
}

export default resource

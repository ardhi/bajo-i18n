async function resource ({ path, args }) {
  const { importPkg, saveAsDownload } = this.app.bajo
  const { prettyPrint } = this.app.bajoCli
  const { get, isEmpty, keys, map } = this.app.bajo.lib._
  const [stripAnsi, select] = await importPkg('bajoCli:strip-ansi', 'bajoCli:@inquirer/select')
  let subPath = args.length === 0 ? '' : `.${args[0].replaceAll(':', '.')}`
  if (isEmpty(subPath)) {
    let choices = map(keys(this.instance.options.resources ?? {}), k => ({ value: k }))
    const lang = await select({
      message: this.print.write('Please choose one of these locales:'),
      choices
    })
    subPath += '.' + lang
    choices = map(keys(get(this.instance, `options.resources${subPath}`, {})), k => ({ value: k }))
    choices.unshift({ value: '', name: this.print.write('- All -') })
    const ns = await select({
      message: this.print.write('Please choose one of these namespaces:'),
      choices
    })
    subPath += isEmpty(ns) ? '' : ('.' + ns)
  }
  let result = get(this.instance, `options.resources${subPath}`, {})
  this.print.info('Done!')
  result = this.app.bajo.config.pretty ? (await prettyPrint(result, false, false)) : JSON.stringify(result, null, 2)
  if (this.app.bajo.config.save) {
    const file = `/${path}/${isEmpty(subPath) ? 'all' : subPath}.${this.app.bajo.config.pretty ? 'txt' : 'json'}`
    await saveAsDownload(file, stripAnsi(result))
  } else console.log(result)
}

export default resource

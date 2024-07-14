async function resource ({ path, args }) {
  const { importPkg } = this.app.bajo
  const { get, isEmpty, keys, map } = this.app.bajo.lib._
  const { getOutputFormat, writeOutput } = this.app.bajoCli
  const select = await importPkg('bajoCli:@inquirer/select')
  const format = getOutputFormat()
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
  const result = get(this.instance, `options.resources${subPath}`, {})
  this.print.info('Done!')
  await writeOutput(result, path, format)
}

export default resource

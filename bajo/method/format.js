function format (value, type, lng, options = {}) {
  const { getConfig, defaultsDeep } = this.bajo.helper
  const cfg = getConfig('bajoI18N')
  const { emptyValue = cfg.format.emptyValue } = options
  if ([undefined, null].includes(value)) return emptyValue
  if (['integer', 'smallint'].includes(type)) {
    value = parseInt(value)
    if (isNaN(value)) return emptyValue
    const setting = defaultsDeep(options.integer, cfg.format.integer)
    return new Intl.NumberFormat(lng, setting).format(value)
  }
  if (['float', 'double'].includes(type)) {
    value = parseFloat(value)
    if (isNaN(value)) return emptyValue
    const setting = defaultsDeep(options.float, cfg.format.float)
    return new Intl.NumberFormat(lng, setting).format(value)
  }
  if (['datetime'].includes(type)) {
    const setting = defaultsDeep(options.datetime, cfg.format.datetime)
    return new Intl.DateTimeFormat(lng, setting).format(value)
  }
  if (['date'].includes(type)) {
    const setting = defaultsDeep(options.date, cfg.format.date)
    return new Intl.DateTimeFormat(lng, setting).format(new Date(value))
  }
  if (['time'].includes(type)) {
    const setting = defaultsDeep(options.time, cfg.format.time)
    return new Intl.DateTimeFormat(lng, setting).format(new Date(`1970-01-01T${value}Z`))
  }
  if (['object'].includes(type)) return JSON.stringify(value)
  return value
}

export default format

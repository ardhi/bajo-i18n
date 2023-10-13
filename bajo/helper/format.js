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
  if (['datetime', 'timestamp'].includes(type)) {
    const setting = defaultsDeep(options.datetime, cfg.format.datetime)
    if (type === 'timestamp') value = new Date(value)
    return new Intl.DateTimeFormat(lng, setting).format(value)
  }
  if (['date'].includes(type)) {
    const setting = defaultsDeep(options.date, cfg.format.date)
    return new Intl.DateTimeFormat(lng, setting).format(value)
  }
  if (['time'].includes(type)) {
    const setting = defaultsDeep(options.time, cfg.format.time)
    return new Intl.DateTimeFormat(lng, setting).format(value)
  }
  if (['object'].includes(type)) return JSON.stringify(value)
  return value
}

export default format

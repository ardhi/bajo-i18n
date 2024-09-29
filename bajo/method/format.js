function format (value, type, lng, options = {}) {
  const { defaultsDeep } = this.app.bajo
  const { emptyValue = this.config.format.emptyValue } = options
  if ([undefined, null].includes(value)) return emptyValue
  if (type === 'auto') {
    if (value instanceof Date) type = 'datetime'
  }
  if (['integer', 'smallint'].includes(type)) {
    value = parseInt(value)
    if (isNaN(value)) return emptyValue
    const setting = defaultsDeep(options.integer, this.config.format.integer)
    return new Intl.NumberFormat(lng, setting).format(value)
  }
  if (['float', 'double'].includes(type)) {
    value = parseFloat(value)
    if (isNaN(value)) return emptyValue
    const setting = defaultsDeep(options.float, this.config.format.float)
    return new Intl.NumberFormat(lng, setting).format(value)
  }
  if (['datetime'].includes(type)) {
    const setting = defaultsDeep(options.datetime, this.config.format.datetime)
    return new Intl.DateTimeFormat(lng, setting).format(value)
  }
  if (['date'].includes(type)) {
    const setting = defaultsDeep(options.date, this.config.format.date)
    return new Intl.DateTimeFormat(lng, setting).format(new Date(value))
  }
  if (['time'].includes(type)) {
    const setting = defaultsDeep(options.time, this.config.format.time)
    return new Intl.DateTimeFormat(lng, setting).format(new Date(`1970-01-01T${value}Z`))
  }
  if (['object'].includes(type)) return JSON.stringify(value)
  return value
}

export default format

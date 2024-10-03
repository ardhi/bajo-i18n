async function init () {
  const { uniq } = this.app.bajo.lib._
  this.config.lang = this.app.bajo.config.lang
  this.config.supportedLngs = uniq(this.config.supportedLngs)
  // this.config.nonExplicitSupportedLngs = true
  if (!this.config.supportedLngs.includes(this.config.lang)) {
    this.log.warn('Unsupported locale \'%s\', switched to the default one \'%s\'', this.config.lang, this.config.fallbackLng)
    this.config.lang = this.config.fallbackLng
  }
  this.config.defaultNS = this.app.bajo.mainNs
  this.config.fallbackNS = this.app.bajo.pluginNames // TODO: ordering by level
  /*
  this.config.fallbackNS = this.config.fallbackNS ?? []
  this.config.fallbackNS.unshift(this.config.defaultNS, this.app.bajo.name, this.name)
  */
}

export default init

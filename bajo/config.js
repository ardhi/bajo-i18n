async function config () {
  return {
    fallbackLng: this.bajo.config.lang,
    supportedLngs: ['en', 'id']
  }
}

export default config
